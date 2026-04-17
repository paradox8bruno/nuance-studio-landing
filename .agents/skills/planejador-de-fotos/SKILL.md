---
name: planejador-de-fotos
description: Use when the user wants to plan a photoshoot, define creative direction for portraits, headshots, lifestyle, editorial, concept, authorial, authority, or professional/work images, or generate clean JSON prompts for Google Nano Banana from a person reference image that must remain faithful to the real subject. Trigger for requests like "planejar ensaio", "foto profissional", "foto de autoridade", "LinkedIn", "casual", "conceito", "autoral", "headshot", or "prompt Nano Banana". Do not use for generic image generation where identity preservation is not central, or for vector/logo editing.
---

# Planejador de Fotos

## Overview

This skill plans people-focused photo concepts and turns them into production-ready JSON prompts for Nano Banana style workflows.

The top priority is identity fidelity: when a reference image is provided, preserve the same person before optimizing wardrobe, environment, mood, or styling.

This project assumes one or more reference photos of the real person will be sent with generation, so prompts should not manually describe the person's age, skin color, hair type, or facial traits unless the user explicitly asks for that.

The default quality target is real photographic credibility. The image should look like a believable human portrait created from a real reference person, not an "AI-looking" portrait that tries too hard to prove realism.

## When To Use

Use this skill when the user wants any of the following:

- Plan a portrait or photo shoot for a real person
- Turn a visual goal into one or more photo concepts
- Generate JSON prompts for Nano Banana
- Keep a person visually identical to a reference image while changing scene, styling, lighting, or camera language
- Create concepts for professional, corporate, casual, authority, concept, editorial, authorial, or lifestyle portraits

Do not use this skill when:

- The task is generic image ideation with no identity lock
- The task is image post-production outside prompt design
- The task is logo, illustration, UI, or vector design

## Non-Negotiables

- Treat the reference image as the source of truth for identity.
- Preserve the person’s visible biometric traits unless the user explicitly asks to change them.
- Do not alter perceived ethnicity, bone structure, facial proportions, skin tone, skin undertone, hair texture, hairline, eye shape, nose shape, mouth shape, teeth, body proportions, or visible markers such as freckles, scars, moles, and tattoos unless requested.
- Keep skin realistic. Prefer subtle pores, natural texture, and believable retouching over plastic smoothing.
- Use wardrobe, pose, environment, composition, color palette, and lighting to communicate the concept. Do not use face changes as a styling shortcut.
- Avoid cliché props tied to professions unless the user explicitly asks for them. For lawyers, avoid gavels, scales of justice, and dusty law libraries by default.
- Keep lighting physically coherent. Use one believable lighting design per shot.
- Prefer specific photographic language over vague praise words. Avoid keyword stuffing such as "masterpiece, best quality, trending, perfect anatomy".
- Do not use hype realism language such as "hyper-realistic", "ultra realistic", "no AI artifacts", "without AI look", "100% human", "proof of realism", or similar phrasing as the main realism strategy.
- Do not force realism with exaggerated skin-detail language like "visible pores proving humanity", "micro-imperfections", "asymmetry that proves it is human", or "extreme photoreal texture".
- For professional portraits, default to restrained, credible, commercially usable realism.

## Workflow

### 1. Read The Goal

Identify:

- Who the image is for
- Where it will be used
- What impression it should create
- How many concepts or final prompts are needed

If the user does not specify usage, infer the most likely context from the request and proceed.

### 2. Check Reference Availability

If a reference image is available:

- Keep the `subject` description concise and fidelity-focused
- State that the generation must preserve exactly the same person from the reference image
- Do not describe age, skin color, hair type, facial structure, or other biometric traits that the reference image already provides
- Do not add invented facial traits that are not supported by the image

If no reference image is available:

- Say that identity fidelity cannot be locked yet
- Only use placeholders or physical descriptors if the user explicitly asks for a template without reference images

### 3. Choose The Concept Family

Pick the concept family that best matches the goal:

- Professional or corporate
- Authority
- Casual premium
- Editorial
- Conceptual
- Authorial
- Lifestyle environmental

Read [references/lookbook.md](references/lookbook.md) only when you need direction for concept families, wardrobe logic, or lighting recipes.

### 4. Build The JSON Prompt

Use the base JSON structure below unless the user asks for a different format:

```json
{
  "subject": "Preservar exatamente a mesma pessoa da imagem de referência enviada, mantendo fidelidade biométrica total, ...",
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

Read [references/nano-banana-rules.md](references/nano-banana-rules.md) when writing or revising the final JSON.

### 4.1 Human Realism Pass

Before finalizing any prompt, check all fields and remove language that commonly makes results look fake:

- Remove exaggerated realism claims
- Remove repeated mentions of AI or fake-avoidance
- Remove redundant skin-detail language
- Remove biometric descriptions already covered by the reference image
- Remove graphic-design instructions that belong in layout, not in the generated photo

Then strengthen realism using only:

- believable lighting
- believable wardrobe
- believable pose
- believable environment
- coherent lens and framing language
- restrained finish and grading

### 5. Respect The Project JSON Contract

- Keep the field order exactly as shown above.
- Prefer `aspect_ratio_target` instead of `aspect_ratio`.
- Add top-level `model` only if the user explicitly asks for a model-specific payload.
- Because this project assumes reference images will be provided, do not include age, skin color, hair type, or facial descriptors in normal final prompts.
- In normal final prompts, use `subject` to lock identity to the reference image instead of describing the person's appearance.
- Only use placeholders or manual physical descriptors if the user explicitly asks for a no-reference template.

## Field Writing Rules

### `subject`

- Start from identity lock.
- State that the image must preserve the exact same person from the reference image.
- Do not describe age, skin color, hair type, face shape, or other biometric details when the reference image will be sent.
- Use the expression, gaze, mood, and presence of the subject, but let the reference image carry the physical identity.
- Include the intended expression and emotional read in visual terms.

### `clothing`

- Specify garment category, material, fit, and tone.
- Keep styling aligned with the concept and the user’s use case.
- Prefer modern, believable wardrobe over costume-like symbolism.

### `hair_and_face`

- Preserve hairline, texture, volume, and grooming logic from the reference.
- Request realistic skin detail, eyes in sharp focus, and natural facial finish.
- Only add makeup or grooming choices when the concept needs them.
- Do not default to pore-heavy, retouch-heavy, or skin-microscopy language.
- A good default is natural grooming, realistic skin texture, and no beauty retouching.

### `action_and_pose`

- Use body language to communicate the brief.
- Prefer concrete pose instructions over abstract adjectives.
- Keep poses physically plausible and photographable.

### `environment`

- Describe only the setting.
- Do not restate the subject here.
- Avoid clutter and cliché symbolism unless explicitly requested.

### `lighting`

- Specify source, direction, softness, contrast, and separation.
- Keep the setup coherent with the environment and desired mood.

### `camera_and_optics`

- Use real camera language: focal length, framing, aperture, depth of field, focus target.
- Prefer 85mm for premium portraits, 50mm for environmental narrative, and 105mm for compressed dramatic portraits unless the brief suggests otherwise.

### `style_and_grading`

- Define the finish in photographic terms.
- Prefer magazine, editorial, corporate, cinematic, documentary, film-stock, or luxury portrait language.
- Keep post-processing believable.
- Avoid stacking intense finish words such as `hyper-realistic`, `8k`, `HDR`, `ultra detailed`, `perfect skin`, and `extreme contrast`.
- If realism matters more than style, choose restraint over intensity.

## Output Modes

### If The User Wants Concepts

Return 3 to 5 options. For each option include:

- A short concept name
- A one-line rationale
- One JSON block

### If The User Wants One Final Prompt

Return only the final JSON unless the user asks for explanation.

### If The User Wants Iteration

Keep the same person locked and revise only the requested dimensions, such as:

- Wardrobe
- Environment
- Pose
- Lighting
- Camera language
- Aspect ratio or crop direction

### If The User Provides A Seed Format

- Preserve the user's key names, order, and stylistic conventions when they provide a preferred JSON shape.
- If their examples mix `aspect_ratio_target` and `aspect_ratio`, standardize to `aspect_ratio_target` unless they explicitly want the legacy key.
- If their example includes `model`, keep it only when the final deliverable is intended to be model-specific.
- If their seed format includes manual physical descriptors for the person, remove those descriptors when the workflow uses reference images, unless the user explicitly asks to keep them.

## Quality Bar

Every final prompt should:

- Sound like a creative director plus photographer, not a list of tags
- Keep identity fidelity explicit
- Use coherent light, optics, styling, and environment
- Avoid contradictions
- Be immediately usable in a Nano Banana workflow
- Avoid "AI-looking realism" caused by over-description or hype-heavy wording
- Separate image prompt content from ad layout or graphic design instructions

## Response Style

- Be concise and decisive
- Prefer finished prompts over long theory
- When the user asks for raw JSON, output raw JSON only
