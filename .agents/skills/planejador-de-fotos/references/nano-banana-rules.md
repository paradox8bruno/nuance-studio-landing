# Nano Banana Rules

Use this reference when writing or revising final JSON prompts.

## Core Principle

The prompt is not just descriptive. It must control identity, scene logic, lighting, optics, and finish in separate fields so the model does not blur one dimension into another.

The default goal is believable human photographic realism. The prompt should reduce synthetic-looking output, not intensify it with hype language.

## Identity Lock Language

Use language close to this inside `subject` whenever a reference image exists:

- "Preservar exatamente a mesma pessoa da imagem de referência"
- "Manter fidelidade biométrica total e identidade visual consistente com a referência"
- "Não alterar idade aparente, proporções faciais, marcadores visuais ou identidade"

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
- Keep post-processing restrained and commercially believable
- Use realism through coherence, not through exaggerated detail claims

## Anti-Patterns

Avoid:

- Keyword stuffing
- Contradictory lighting
- Non-visual abstractions with no physical manifestation
- Cliché professional props by default
- Excessive beauty filtering language
- `hyper-realistic`, `ultra realistic`, `no AI artifacts`, `without AI look`, `100% human`, `proves it is real`, or similar phrases
- Repeated "pore", "micro-texture", "micro-imperfection", or "asymmetry proves humanity" language
- Design/layout instructions inside the photo-generation prompt
- Extreme noir drama as the default authority look
- Manual biometric description when the reference image is already attached

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

## Prompt Hygiene Checklist

- Identity is locked to the reference image
- No biometric description is repeated unnecessarily
- The scene uses one believable environment
- The lighting uses one coherent setup
- The lens language matches the intended framing
- The finish is restrained and photographic
- No graphic overlays, CTA text, borders, or branding instructions are embedded in the image prompt
- No hype-heavy anti-AI wording appears in the JSON

## Recommended Standard Portrait Template

```json
{
  "subject": "Preservar exatamente a mesma pessoa da imagem de referência enviada, mantendo fidelidade biométrica total e identidade visual consistente. Retrato profissional da mesma pessoa, com presença calma, segura e confiável.",
  "clothing": "Blazer escuro estruturado ou alfaiataria limpa com camisa clara bem ajustada, styling profissional atemporal e discreto.",
  "hair_and_face": "Manter cabelo, grooming, estrutura facial e marcadores visuais consistentes com a referência. Textura de pele natural, acabamento realista e sem retoque cosmético exagerado.",
  "action_and_pose": "Retrato chest-up com postura ereta, ombros alinhados, olhar direto para a câmera e expressão séria porém natural.",
  "environment": "Fundo de estúdio neutro em cinza escuro ou grafite, limpo, premium e sem elementos distrativos.",
  "lighting": "Luz principal de estúdio a 45 graus com queda suave de sombra e preenchimento discreto, definição facial natural e catchlights realistas.",
  "camera_and_optics": "Estética de retrato profissional com lente de 85mm, profundidade de campo rasa e foco preciso no rosto.",
  "style_and_grading": "Realismo editorial premium, gradação contida, contraste equilibrado, textura de pele e tecido natural, acabamento humano e crível.",
  "resolution_target": "4K",
  "aspect_ratio_target": "4:5"
}
```

## Recommended Model-Specific Template

```json
{
  "model": "gemini-3.1-flash-image-preview",
  "subject": "Preservar exatamente a mesma pessoa da imagem de referência enviada, mantendo fidelidade biométrica total e identidade visual consistente. Retrato profissional da mesma pessoa com expressão concentrada, serena e confiante.",
  "clothing": "Blazer escuro estruturado com camisa social clara, styling limpo, sofisticado e atemporal.",
  "hair_and_face": "Manter cabelo, grooming, estrutura facial e marcadores visuais consistentes com a referência. Textura de pele natural, olhos bem definidos e acabamento sem suavização artificial.",
  "action_and_pose": "Enquadramento busto fechado, rosto levemente orientado à câmera, queixo neutro, postura firme e expressão controlada.",
  "environment": "Fundo de estúdio escuro neutro, limpo e sem elementos cenográficos.",
  "lighting": "Luz lateral controlada com contraste moderado e preenchimento mínimo, definição facial elegante e fisicamente plausível.",
  "camera_and_optics": "Full-frame, lente 85mm, profundidade de campo rasa e foco preciso no olho mais próximo da câmera.",
  "style_and_grading": "Realismo editorial sofisticado, pretos ricos porém naturais, gradação contida e acabamento premium sem exagero dramático.",
  "resolution_target": "4K",
  "aspect_ratio_target": "2:3"
}
```
