---
name: prompts-de-criativos
description: Use when the user wants complete creative JSONs for Nuance Studio ads, especially Meta Ads creatives with before/after structures, product offer clarity, CTA, headlines, and image prompts that must preserve the same real person from reference photos. Trigger for requests like "criativo", "meta ads", "antes e depois", "headline", "cta", "copy do anuncio", "json completo do criativo", or "prompt dos criativos".
---

# Prompts de Criativos

## Overview

This skill creates full creative JSONs for Nuance Studio campaigns.

It is not only an image-prompt skill. It combines:

- ad angle
- audience framing
- headline
- CTA
- supporting copy
- layout direction
- image-generation prompts

The photo prompts inside each creative must still obey the project's portrait prompt contract and identity-fidelity rules.

## When To Use

Use this skill when the user asks for:

- Meta Ads creatives
- before/after ad concepts
- creative JSONs for campaigns
- headlines and CTAs tied to image prompts
- niche-specific creatives such as lawyers, doctors, consultants, executives
- product-selling creatives for Nuance Studio

Do not use this skill when:

- The user wants only one isolated portrait prompt
- The user wants only copywriting with no visual direction
- The task is a generic brand campaign unrelated to this project

## Core Rule

Separate these three layers clearly:

1. Image generation
2. Layout and visual composition
3. Ad copy and CTA

Do not mix them carelessly.

The generated photo should remain clean and realistic. Borders, labels, price, guarantee, logo, headline, CTA bars, and badges belong in the final design layout unless the user explicitly asks for them inside the generated image.

## Product Framing Rule

Nuance Studio is not sold as "AI photos".

The product should be framed as:

- professional photos made from the client's real photo
- image repositioning
- more authority and confidence
- practical and fast delivery
- approval before payment

Creative copy should make the product easy to understand in seconds.

The user should understand:

- what the product is
- who it is for
- what changes after buying
- why they should click now

## Realism Rule

For image prompts inside creatives:

- Use reference-photo identity lock
- Avoid manual biometric descriptions
- Avoid hype-heavy realism wording
- Avoid "no AI look" wording
- Avoid pore-stuffing and over-explaining skin detail
- Prefer believable lighting, wardrobe, framing, and environment
- Keep the same person consistent across all `antes` and `depois` shots when the creative is person-specific

## Default Creative JSON Shape

Unless the user provides another structure, prefer this shape:

```json
{
  "criativo": {
    "id": 1,
    "nome": "",
    "formato": "4:5",
    "dimensoes_px": "1080 x 1350",
    "plataforma": "Instagram Feed / Facebook Feed",
    "objetivo": "Conversao",
    "publico": ""
  },
  "angulo_de_venda": {
    "big_idea": "",
    "promessa": "",
    "mecanismo": "",
    "dor_principal": ""
  },
  "copy_meta_ads": {
    "primary_text": "",
    "headline": "",
    "description": "",
    "cta_button": "Saiba mais"
  },
  "composicao_layout": {
    "descricao": "",
    "estrutura": {},
    "elementos_de_texto": {},
    "estilo_visual": {}
  },
  "instrucoes_de_producao": {
    "montagem": "",
    "observacoes": ""
  },
  "prompts_visuais": {}
}
```

## Image Prompt Rule Inside Creatives

Each entry inside `prompts_visuais` should use the project's exact prompt contract unless the user explicitly asks for another schema:

```json
{
  "subject": "",
  "clothing": "",
  "hair_and_face": "",
  "action_and_pose": "",
  "environment": "",
  "lighting": "",
  "camera_and_optics": "",
  "style_and_grading": "",
  "resolution_target": "1080 x 1350",
  "aspect_ratio_target": "4:5"
}
```

## Before/After Rule

When building `antes e depois` creatives:

- `antes` should look real, ordinary, and non-professional, but still believable and respectful
- `depois` should look professionally directed, premium, and credible
- The improvement should come from styling, pose, lighting, framing, and finish
- The person must remain clearly the same person
- Avoid making `antes` ugly or caricatured
- Avoid making `depois` overly dramatic or artificially perfect

## Copy Rule

Strong creative copy should do four things:

1. Name the pain
2. Clarify the product
3. Show the outcome
4. Give a concrete CTA

Prefer clear sales language over abstract branding language.

Weak:

- "Sua melhor versao visual"

Better:

- "Voce envia uma foto comum. A gente entrega um ensaio profissional em ate 24h."

## Niche Rule

If the creative is for a profession:

- reflect the niche in wardrobe, posture, environment, and tone
- avoid cartoonish props
- speak directly to the professional outcome that matters in that niche

For lawyers by default:

- use dark or neutral premium wardrobe
- prefer sober authority
- avoid gavels, scales, court costumes, and exaggerated library clichés

## Output Modes

### One Creative

Return one complete JSON.

### Multiple Creatives

Return one complete JSON per creative.

### Raw JSON Only

Return only the JSON blocks with no explanation.

## Quality Bar

Every creative must make the buyer understand:

- this is a professional photo product
- it starts from their own real photo
- the result is more authority, confidence, and professional value
- there is a low-risk buying path

Every image prompt inside the creative must:

- preserve the same person from reference
- stay realistic and human
- avoid synthetic-looking language
- be immediately usable in production
