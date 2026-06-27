# Trading Chef Remotion OS v2

This upgraded starter package matches the next-step workflow:

1. Get chef avatar poses.
2. Run the Remotion project.
3. Upload `sceneTypes.ts` and `masterlist.md` into your AI Project.
4. Start with Prompt #01 or #10.
5. Render the FVG Recipe video with `npm run render:tc`.

## Install

```bash
npm install
npm run dev
```

## Render

```bash
npm run render:tc
```

## Render Short

```bash
npm run render:short
```

## Add Chef Avatar Poses

Place transparent PNG files here:

```text
public/chef/
```

Use these names:

```text
chef-confident.png
chef-teaching.png
chef-warning.png
chef-celebrating.png
```

If you do not add them yet, placeholders will show.

## Upload to ChatGPT or Claude Project

Upload:

```text
prompts/masterlist.md
src/types/sceneTypes.ts
src/data/videoData.ts
```

Educational only — not financial advice.
