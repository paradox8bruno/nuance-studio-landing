# Nano Banana Rules

Use this reference when writing or revising final JSON prompts.

## Core Principle

The prompt is not just descriptive. It must control identity, scene logic, lighting, optics, and finish in separate fields so the model does not blur one dimension into another.

## Identity Lock Language

Use language close to this inside `subject` whenever a reference image exists:

- "Preservar exatamente a mesma pessoa da imagem de referência"
- "Manter traços biométricos, estrutura facial, tom de pele, textura do cabelo e marcadores visuais consistentes com a referência"
- "Não alterar idade aparente, proporções faciais ou identidade visual"

Do not over-describe what the reference image already anchors.

For this project, the default rule is stricter:

- Do not manually describe age
- Do not manually describe skin color
- Do not manually describe hair type
- Do not manually describe facial structure
- Let the attached reference image carry the person's identity

## Default JSON Shape

```json
{
  "subject": "Preservar exatamente a mesma pessoa da imagem de referência enviada, mantendo fidelidade biométrica total e identidade visual consistente, ...",
  "clothing": "",
  "hair_and_face": "",
  "action_and_pose": "",
  "environment": "",
  "lighting": "",
  "camera_and_optics": "",
  "style_and_grading": "",
  "resolution_target": "4K",
  "aspect_ratio_target": "4:5"
}
```

## Field Order

Keep this order by default:

1. `subject`
2. `clothing`
3. `hair_and_face`
4. `action_and_pose`
5. `environment`
6. `lighting`
7. `camera_and_optics`
8. `style_and_grading`
9. `resolution_target`
10. `aspect_ratio_target`

## Optional Fields

Add optional fields only when they materially help the brief:

- `model`: only when the user explicitly wants a model-specific payload
- `aspect_ratio_target`: keep as the preferred ratio key when the crop matters
- `aspect_ratio`: legacy alias only if the user explicitly asks to preserve it
- `editing_instruction`: when revising an already approved image without changing identity

Example:

```json
{
  "aspect_ratio_target": "4:5",
  "editing_instruction": "Trocar apenas o fundo para um interior corporativo escuro, mantendo a pessoa, a pose e a iluminação principal intactas."
}
```

## Subject Field Rule

When a reference image is available, start from identity lock language and do not manually describe the person's physical traits.

Only use fillable placeholders for physical traits if the user explicitly asks for a no-reference template.

## Strong Patterns

- Use one environment and one coherent lighting scheme
- Use real lens and aperture language
- Request sharp eyes and natural skin texture
- Translate emotional goals into visible body language
- Prefer precise material and fit descriptions in wardrobe

## Anti-Patterns

Avoid:

- Keyword stuffing
- Contradictory lighting
- Non-visual abstractions with no physical manifestation
- Cliché professional props by default
- Excessive beauty filtering language

## Focal Length Heuristics

- `85mm`: premium portrait, authority, LinkedIn, corporate, beauty
- `50mm`: narrative, lifestyle, environmental portrait
- `105mm`: compressed, dramatic, cinematic portrait
- `35mm`: only when the brief clearly needs a wider perspective and some distortion is acceptable

## Lighting Heuristics

- Soft window light: transparency, calm authority, corporate polish
- Three-point softbox: premium headshot, neutral background, magazine control
- Golden hour backlight: aspirational lifestyle, warmth, premium optimism
- Chiaroscuro or Rembrandt: strategic power, drama, legal or executive gravitas
- Volumetric skylight: modern editorial, architectural seriousness

## Profession-Specific Guidance

If the user names a profession, communicate it through:

- Wardrobe
- Architecture
- Material choices
- Posture
- Lighting
- Framing

Do not reach for props first.

For lawyers by default, avoid:

- Gavel
- Scale of justice
- Old library shelves
- Courtroom caricatures

## Revision Rule

When the user asks to tweak a prompt, keep the existing identity lock and only change the requested fields. Do not casually rewrite the whole concept unless the user asks for a new direction.

## User-Preferred Style Examples

The project prefers prompts shaped like these patterns:

### Standard portrait template

```json
{
  "subject": "Preservar exatamente a mesma pessoa da imagem de referência enviada, mantendo fidelidade biométrica total e identidade visual consistente. Semblante calmo, analítico e de confiança silenciosa. Olhar direto, inteligente e levemente enigmático.",
  "clothing": "Camisa estilo henley moderna em tom cinza urze (heather gray) ou blusa de gola alta preta minimalista (turtleneck). Tecido de alta qualidade com caimento perfeito.",
  "hair_and_face": "Iluminação esculpindo sutilmente as maçãs do rosto. Detalhes microscópicos da epiderme visíveis, garantindo total fotorrealismo.",
  "action_and_pose": "Plano médio (headshot clássico). Braços cruzados de forma solta na altura do abdômen, postura ereta, habitando o espaço com segurança.",
  "environment": "Fundo de estúdio escuro, cinza carvão sólido (solid charcoal neutral studio background).",
  "lighting": "Iluminação de estúdio dramática porém suave. Luz principal a 45 graus (Rembrandt light) criando dimensão no rosto, luz de recorte traseira (rim light) sutil para separar o sujeito do fundo escuro.",
  "camera_and_optics": "Captura de formato médio, lente prime de 105mm para compressão facial elegante, abertura f/5.6 garantindo nitidez absoluta na textura da roupa e no rosto.",
  "style_and_grading": "Estética moderna e sofisticada, alto contraste dinâmico, paleta de cores monocromática com pretos ricos e aveludados.",
  "resolution_target": "4K",
  "aspect_ratio_target": "1:1"
}
```

### Model-specific payload

```json
{
  "model": "gemini-3.1-flash-image-preview",
  "subject": "Preservar exatamente a mesma pessoa da imagem de referência enviada, mantendo fidelidade biométrica total e identidade visual consistente. Expressão concentrada e analítica, presença forte e controlada.",
  "clothing": "Blazer masculino preto estruturado, camisa social branca com colarinho levemente aberto. Alto contraste entre tecidos.",
  "hair_and_face": "Textura de pele hiper-detalhada, foco em navalha no olho iluminado, traços faciais preservados com realismo absoluto.",
  "action_and_pose": "Rosto exatamente de frente para a câmera. Queixo paralelo ao chão. Expressão neutra e intensa. Enquadramento busto fechado.",
  "environment": "Fundo de estúdio preto absoluto, textura mate sem reflexo. Zero elementos cenográficos.",
  "lighting": "Split lighting clássico com fonte única lateral a 90 graus, sem fill light, contraste máximo absoluto.",
  "camera_and_optics": "Full-frame, lente prime 85mm, f/2.0. Profundidade de campo rasa e foco no olho iluminado.",
  "style_and_grading": "Fotorrealismo cinematográfico extremo, retrato noir de luxo, pretos profundos e textura de pele muito detalhada.",
  "resolution_target": "4K",
  "aspect_ratio_target": "2:3"
}
```
