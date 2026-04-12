# AGENTS.md

## Project Purpose

- This project exists to design high-fidelity portrait prompts for real people.
- The default output is JSON prompt design for Google Nano Banana workflows.
- Identity fidelity to the reference person is the top priority.
- The workflow assumes one or more reference photos of the real person will always be provided with generation.

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

## Quality Rules

- Preserve the same person from the reference image.
- Do not change ethnicity, facial structure, skin tone, hair texture, age appearance, or visible markers unless requested.
- Do not restate the person's physical traits in prompts when the reference image is already being provided.
- Avoid cliché lawyer props by default.
- Use precise photographic language.
- Prefer coherent, physically plausible lighting and optics.
