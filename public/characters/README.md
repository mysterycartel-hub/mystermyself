# TCU Character Art Assets

Kiro manages this folder. Character PNGs are sourced from Maurice's local machine
and copied here automatically during OPS/008B. No manual upload required from CEO.

## Canonical filenames:
- trading-chef.png       (avatar — min 200x200, transparent bg preferred)
- trading-chef-hero.png  (hero — min 800x600, transparent bg preferred)
- candle-kid.png
- wickie.png
- louie-liquidity.png
- chef-goldie.png
- grandma-market.png
- nana-value.png
- melissa-mayhem.png
- melody-mayhem.png

## Art direction:
- Urban cartoon style
- Transparent background PNG
- See docs/VISUAL-CANON.md for full direction

## Adding new art:
Kiro copies updated files here and commits. CEO approves the PR. Done.

## How auto-display works:
The `TCUAvatarPlaceholder` component checks for images at these paths.
When a PNG exists → it displays automatically. No code change needed.
When no PNG exists → premium CSS/SVG placeholder renders instead.
