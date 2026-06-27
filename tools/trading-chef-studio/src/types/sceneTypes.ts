export type ChefPose =
  | "confident"
  | "teaching"
  | "warning"
  | "celebrating";

export type SceneType =
  | "hook"
  | "lesson"
  | "chart"
  | "warning"
  | "checklist"
  | "cta";

export type SceneData = {
  id: string;
  type: SceneType;
  start: number;
  duration: number;
  title: string;
  subtitle: string;
  voiceover: string;
  chefPose: ChefPose;
  visual: string;
  sfx?: string;
};

export type TradingChefVideoData = {
  title: string;
  hook: string;
  durationSeconds: number;
  disclaimer: string;
  audience: string;
  lesson: string;
  cta: string;
  scenes: SceneData[];
};
