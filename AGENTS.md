# AGENTS.md

## Project Purpose

- This project exists to design high-fidelity portrait prompts for real people.
- The default output is JSON prompt design for Google Nano Banana workflows.
- Identity fidelity to the reference person is the top priority.
- The workflow assumes one or more reference photos of the real person will always be provided with generation.
- The project default is believable photographic realism, not stylized "AI realism".
- The person must look recognizably human, consistent with the reference image, and free from synthetic skin, fake texture, or uncanny rendering.

## Prompt Contract

- Unless the user explicitly requests a different structure, output prompts in this exact JSON field order:
  - `subject`
  - `clothing`
  - `hair_and_face`
  - `action_and_pose`
  - `environment`
  - `lighting`
  - `camera_and_optics`
  - `style_and_grading`
  - `resolution_target`
  - `aspect_ratio_target`
- Use `aspect_ratio_target` as the default ratio key. Do not use `aspect_ratio` unless the user explicitly asks for that legacy field.
- Include top-level `model` only when the user explicitly asks for a model-specific payload or provides a model value to preserve.
- Because the workflow always includes one or more reference photos, do not describe age, skin color, hair type, facial structure, or any biometric details of the person inside the prompt unless the user explicitly asks for those descriptors.
- In `subject`, instruct the model to preserve exactly the same person from the reference image and keep biometric fidelity, instead of manually describing the person's appearance.
- Keep the JSON clean. No markdown fences, labels, or explanation when the user asks for raw JSON only.

## Realism Protocol

- Default to natural photographic language, not hype language.
- Prefer lighting, pose, wardrobe, lens choice, framing, and believable post-processing over buzzwords.
- Treat attached reference photos as the only source of truth for the person's physical identity.
- Keep skin realistic and human: natural texture, restrained retouching, believable eyes, believable hair, believable fabric detail.
- Prefer one coherent lighting setup and one coherent environment per image.
- Prefer dark neutral, gray, beige, or understated professional backgrounds over theatrical or cliché sets unless the user explicitly asks otherwise.
- When the user wants strong realism, reduce prompt intensity rather than increasing it.

## Anti-Fake Rules

- Do not use phrases such as `hyper-realistic`, `ultra realistic`, `extreme photorealism`, `no AI artifacts`, `without AI look`, `100% human`, `proof it is human`, `micro-pores`, `skin pores proving realism`, `perfectly realistic`, or similar hype-heavy realism claims unless the user explicitly requests them.
- Do not ask for "visible pores", "asymmetry that proves humanity", "micro-imperfections", "HDR realism", or exaggerated skin-detail language as a default realism tactic.
- Do not describe the person's ethnicity, age bracket, skin tone, hair texture, face shape, or bone structure when a reference image is already being sent.
- Do not rely on dramatic noir lighting, pure black backgrounds, heavy rim light, or extreme contrast as the default solution for authority portraits.
- Do not put logos, CTAs, price, guarantee text, labels, or graphic layout instructions inside the image-generation prompt unless the user explicitly wants in-image text.
- For creative layouts, generate the photo prompts separately and assume borders, badges, labels, CTA bars, logos, and typography will be added in design after generation.

## Creative JSON Rule

- When the user asks for ad creatives, campaign creatives, or Meta creative JSON, each creative should still keep image prompts in the project's portrait prompt contract unless the user explicitly asks for another internal schema.
- Keep product messaging, CTA, labels, pricing, guarantee, and layout directions outside the image prompt whenever possible.
- Distinguish clearly between:
  - image-generation instructions
  - layout and design instructions
  - ad copy and CTA
- If a creative contains multiple images such as `antes` and `depois`, preserve the same person across all generated images unless the user explicitly asks for generic mockups.

## Quality Rules

- Preserve the same person from the reference image.
- Do not change ethnicity, facial structure, skin tone, hair texture, age appearance, or visible markers unless requested.
- Do not restate the person's physical traits in prompts when the reference image is already being provided.
- Avoid cliché lawyer props by default.
- Use precise photographic language.
- Prefer coherent, physically plausible lighting and optics.
- Prefer believable corporate, editorial, or lifestyle realism over dramatic prompt theatrics.
- Keep the final result human, restrained, and commercially credible.
