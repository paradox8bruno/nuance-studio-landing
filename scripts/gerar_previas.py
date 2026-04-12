#!/usr/bin/env python3
from __future__ import annotations

import argparse
import shutil
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path


SUPPORTED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff"}
SOURCE_DIR_CANDIDATES = ("originais", "completas", "full")
PREVIEW_DIR_NAME = "previas"


@dataclass(frozen=True)
class PreviewJob:
    client_dir: Path
    source_dir: Path
    source_image: Path
    output_image: Path


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description=(
            "Gera previas com marca d'agua para cada cliente dentro da pasta de ensaios."
        )
    )
    parser.add_argument(
        "--root",
        type=Path,
        default=Path("ensaios"),
        help="Pasta raiz que contem uma pasta por cliente. Padrao: ./ensaios",
    )
    parser.add_argument(
        "--cliente",
        dest="client_filter",
        help="Nome exato da pasta do cliente para processar apenas um ensaio.",
    )
    parser.add_argument(
        "--watermark",
        default="NUANCE STUDIO",
        help="Texto da marca d'agua. Padrao: NUANCE STUDIO",
    )
    parser.add_argument(
        "--max-dimension",
        type=int,
        default=0,
        help=(
            "Opcional. Reduz o maior lado das previas para este valor em pixels. "
            "Padrao: manter o tamanho original."
        ),
    )
    parser.add_argument(
        "--quality",
        type=int,
        default=82,
        help="Qualidade JPEG das previas. Padrao: 82",
    )
    parser.add_argument(
        "--overwrite",
        action="store_true",
        help="Recria previas mesmo quando o arquivo de saida ja existe.",
    )
    return parser.parse_args()


def ensure_magick_available() -> str:
    magick = shutil.which("magick")
    if not magick:
        raise SystemExit(
            "ImageMagick nao encontrado. Instale o comando 'magick' para gerar as previas."
        )
    return magick


def list_client_dirs(root: Path, client_filter: str | None) -> list[Path]:
    if not root.exists():
        raise SystemExit(f"Pasta raiz nao encontrada: {root}")

    client_dirs = [path for path in sorted(root.iterdir()) if path.is_dir()]
    if client_filter:
        client_dirs = [path for path in client_dirs if path.name == client_filter]

    if not client_dirs:
        target = client_filter or "nenhum cliente"
        raise SystemExit(f"Nenhuma pasta de cliente encontrada para: {target}")

    return client_dirs


def has_supported_images(directory: Path) -> bool:
    return any(
        path.is_file() and path.suffix.lower() in SUPPORTED_EXTENSIONS
        for path in directory.rglob("*")
    )


def resolve_source_dir(client_dir: Path) -> Path | None:
    for candidate in SOURCE_DIR_CANDIDATES:
        source_dir = client_dir / candidate
        if source_dir.is_dir() and has_supported_images(source_dir):
            return source_dir

    if has_supported_images(client_dir):
        return client_dir

    return None


def iter_source_images(source_dir: Path, client_dir: Path) -> list[Path]:
    images: list[Path] = []
    for path in sorted(source_dir.rglob("*")):
        if not path.is_file():
            continue
        if path.suffix.lower() not in SUPPORTED_EXTENSIONS:
            continue
        if PREVIEW_DIR_NAME in path.parts:
            continue
        if source_dir == client_dir and path.parent.name == PREVIEW_DIR_NAME:
            continue
        images.append(path)
    return images


def rename_originals(source_images: list[Path]) -> list[Path]:
    """Renomeia as originais para foto1, foto2, foto3... e retorna os novos caminhos."""
    target_paths = [
        img.parent / f"foto{i}{img.suffix.lower()}"
        for i, img in enumerate(source_images, start=1)
    ]

    # Se todos ja estao com o nome correto, nao faz nada
    if all(src == tgt for src, tgt in zip(source_images, target_paths)):
        return target_paths

    # Fase 1: renomear para nomes temporarios para evitar conflitos entre arquivos
    tmp_paths: list[Path] = []
    for src in source_images:
        tmp = src.parent / f"__tmp_{src.name}"
        src.rename(tmp)
        tmp_paths.append(tmp)

    # Fase 2: renomear para o nome final
    renamed: list[Path] = []
    for tmp, target in zip(tmp_paths, target_paths):
        tmp.rename(target)
        original_name = tmp.name.removeprefix("__tmp_")
        if original_name != target.name:
            print(f"[renomeado] {original_name} → {target.name}")
        renamed.append(target)

    return renamed


def build_jobs(client_dirs: list[Path]) -> list[PreviewJob]:
    jobs: list[PreviewJob] = []

    for client_dir in client_dirs:
        source_dir = resolve_source_dir(client_dir)
        if source_dir is None:
            print(
                f"[ignorado] {client_dir.name}: nenhuma imagem encontrada na pasta do cliente.",
                file=sys.stderr,
            )
            continue

        preview_root = client_dir / PREVIEW_DIR_NAME
        source_images = iter_source_images(source_dir, client_dir)
        source_images = rename_originals(source_images)

        for source_image in source_images:
            output_image = preview_root / source_image.name
            jobs.append(
                PreviewJob(
                    client_dir=client_dir,
                    source_dir=source_dir,
                    source_image=source_image,
                    output_image=output_image,
                )
            )

    return jobs


def read_image_dimensions(magick: str, image_path: Path) -> tuple[int, int]:
    result = subprocess.run(
        [magick, "identify", "-format", "%w %h", str(image_path)],
        check=True,
        capture_output=True,
        text=True,
    )
    width_str, height_str = result.stdout.strip().split()
    return int(width_str), int(height_str)


def resized_dimensions(width: int, height: int, max_dimension: int) -> tuple[int, int]:
    if max_dimension <= 0:
        return width, height

    largest_side = max(width, height)
    if largest_side <= max_dimension:
        return width, height

    scale = max_dimension / largest_side
    resized_width = max(1, round(width * scale))
    resized_height = max(1, round(height * scale))
    return resized_width, resized_height


def clamp(value: int, minimum: int, maximum: int) -> int:
    return max(minimum, min(value, maximum))


def escape_draw_text(text: str) -> str:
    return text.replace("\\", "\\\\").replace("'", "\\'")


def build_draw_commands(
    watermark_text: str,
    target_width: int,
    target_height: int,
) -> tuple[list[str], list[str]]:
    base_size = min(target_width, target_height)
    point_size = clamp(round(base_size * 0.05), 32, 110)
    spacing_x = clamp(round(target_width * 0.35), 280, 700)
    spacing_y = clamp(round(target_height * 0.28), 220, 560)
    margin_x = round(spacing_x * 0.5)
    margin_y = round(spacing_y * 0.5)

    escaped_text = escape_draw_text(watermark_text)
    grid_commands: list[str] = [
        "(",
        "-size",
        f"{target_width}x{target_height}",
        "xc:none",
        "-fill",
        "rgba(255,255,255,0.22)",
        "-stroke",
        "rgba(0,0,0,0.18)",
        "-strokewidth",
        "1",
        "-pointsize",
        str(point_size),
    ]

    row = 0
    y = -margin_y
    while y <= target_height + margin_y:
        offset_x = round(spacing_x * 0.5) if row % 2 == 0 else 0
        x = -margin_x + offset_x
        while x <= target_width + margin_x:
            draw_text = f"translate {x},{y} rotate -30 text 0,0 '{escaped_text}'"
            grid_commands.extend(["-draw", draw_text])
            x += spacing_x
        y += spacing_y
        row += 1

    grid_commands.extend([")"])

    # Sem marca central — a grade discreta já é suficiente para proteger
    return grid_commands, []


def output_format_options(output_image: Path, quality: int) -> list[str]:
    extension = output_image.suffix.lower()
    if extension in {".jpg", ".jpeg"}:
        return [
            "-sampling-factor",
            "4:2:0",
            "-interlace",
            "Plane",
            "-quality",
            str(quality),
        ]

    if extension == ".webp":
        return ["-quality", str(quality)]

    if extension in {".tif", ".tiff"}:
        return ["-compress", "zip"]

    return []


def build_magick_command(
    magick: str,
    source_image: Path,
    output_image: Path,
    watermark_text: str,
    target_width: int,
    target_height: int,
    max_dimension: int,
    quality: int,
) -> list[str]:
    command = [
        magick,
        str(source_image),
        "-auto-orient",
    ]

    if max_dimension > 0:
        command.extend(["-resize", f"{max_dimension}x{max_dimension}>"])

    command.extend(["-colorspace", "sRGB"])
    grid_commands, center_commands = build_draw_commands(
        watermark_text=watermark_text,
        target_width=target_width,
        target_height=target_height,
    )
    command.extend(grid_commands)
    command.extend(["-compose", "over", "-composite"])
    if center_commands:
        command.extend(center_commands)
        command.extend(["-compose", "over", "-composite"])
    command.extend(output_format_options(output_image, quality))
    command.append(str(output_image))
    return command


def create_preview(
    magick: str,
    job: PreviewJob,
    watermark_text: str,
    max_dimension: int,
    quality: int,
    overwrite: bool,
) -> str:
    if job.output_image.exists() and not overwrite:
        source_mtime = job.source_image.stat().st_mtime
        output_mtime = job.output_image.stat().st_mtime
        if output_mtime >= source_mtime:
            return "skipped"

    job.output_image.parent.mkdir(parents=True, exist_ok=True)

    width, height = read_image_dimensions(magick, job.source_image)
    target_width, target_height = resized_dimensions(width, height, max_dimension)
    command = build_magick_command(
        magick=magick,
        source_image=job.source_image,
        output_image=job.output_image,
        watermark_text=watermark_text,
        target_width=target_width,
        target_height=target_height,
        max_dimension=max_dimension,
        quality=quality,
    )
    subprocess.run(command, check=True)
    return "generated"


def main() -> int:
    args = parse_args()
    magick = ensure_magick_available()
    root = args.root.expanduser().resolve()

    client_dirs = list_client_dirs(root, args.client_filter)
    jobs = build_jobs(client_dirs)

    if not jobs:
        print("Nenhuma imagem elegivel encontrada para gerar previas.")
        return 0

    generated = 0
    skipped = 0

    for job in jobs:
        try:
            result = create_preview(
                magick=magick,
                job=job,
                watermark_text=args.watermark,
                max_dimension=args.max_dimension,
                quality=args.quality,
                overwrite=args.overwrite,
            )
        except subprocess.CalledProcessError as exc:
            print(
                f"[erro] {job.source_image}: falha ao gerar previa ({exc.returncode}).",
                file=sys.stderr,
            )
            continue

        relative_output = job.output_image.relative_to(job.client_dir)
        if result == "generated":
            generated += 1
            print(f"[ok] {job.client_dir.name}: {relative_output}")
        else:
            skipped += 1
            print(f"[skip] {job.client_dir.name}: {relative_output}")

    print(
        f"Concluido. {generated} previa(s) gerada(s), {skipped} pulada(s). Pasta raiz: {root}"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
