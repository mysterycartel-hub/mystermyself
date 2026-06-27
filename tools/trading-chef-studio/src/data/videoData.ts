import type { TradingChefVideoData } from "../types/sceneTypes";

export const fvgRecipeVideo: TradingChefVideoData = {
  title: "The FVG Recipe: Why Price Leaves Leftovers",
  hook: "Price moved too fast and left leftovers in the kitchen.",
  durationSeconds: 36,
  disclaimer: "Educational only — not financial advice.",
  audience: "Beginner gold traders learning market structure",
  lesson: "Fair Value Gaps are imbalance zones where price moved quickly and may return later.",
  cta: "Follow The Trading Chef for daily chart recipes.",
  scenes: [
    {
      id: "scene-01",
      type: "hook",
      start: 0,
      duration: 6,
      title: "Price Left Leftovers 🍳",
      subtitle: "This is the FVG Recipe",
      voiceover: "Price moved too fast and left leftovers in the kitchen. That imbalance is what traders call an FVG.",
      chefPose: "confident",
      visual: "Chef appears beside glowing chart gap.",
      sfx: "whoosh"
    },
    {
      id: "scene-02",
      type: "lesson",
      start: 6,
      duration: 8,
      title: "What Is An FVG?",
      subtitle: "A fast move that skipped fair pricing",
      voiceover: "A fair value gap forms when the market moves so fast that it leaves an imbalance behind.",
      chefPose: "teaching",
      visual: "Three-candle diagram with middle candle displacement.",
      sfx: "pop"
    },
    {
      id: "scene-03",
      type: "chart",
      start: 14,
      duration: 8,
      title: "Why It Matters",
      subtitle: "Price may return to rebalance",
      voiceover: "Like a chef returning to clean the counter, price can come back to fill the leftover zone.",
      chefPose: "teaching",
      visual: "Arrow returns into highlighted gap zone.",
      sfx: "sparkle"
    },
    {
      id: "scene-04",
      type: "warning",
      start: 22,
      duration: 7,
      title: "Do Not Chase Candles",
      subtitle: "Let the setup cook first",
      voiceover: "Do not chase the candle. Wait for confirmation before you take the plate.",
      chefPose: "warning",
      visual: "Red warning sign over fast candle.",
      sfx: "alert"
    },
    {
      id: "scene-05",
      type: "cta",
      start: 29,
      duration: 7,
      title: "Daily Chart Recipes",
      subtitle: "Follow The Trading Chef",
      voiceover: "Educational only, not financial advice. Follow The Trading Chef for the next recipe.",
      chefPose: "celebrating",
      visual: "End card with chef, logo, and CTA.",
      sfx: "ding"
    }
  ]
};
