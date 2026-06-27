import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { ChefAvatar } from "./ChefAvatar";
import { ChartKitchen } from "./ChartKitchen";
import { SafeText } from "./SafeText";
import type { SceneData } from "../types/sceneTypes";

type Props = {
  scene: SceneData;
  vertical?: boolean;
};

export const SceneCard: React.FC<Props> = ({ scene, vertical = false }) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 18], [0.97, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(circle at 20% 15%, #ff7a00 0%, #27113d 35%, #05070d 100%)",
        transform: `scale(${scale})`,
      }}
    >
      <SafeText vertical={vertical} size={vertical ? 76 : 58} top={vertical ? 145 : 58}>
        {scene.title}
      </SafeText>

      <SafeText vertical={vertical} size={vertical ? 42 : 32} top={vertical ? 330 : 140}>
        {scene.subtitle}
      </SafeText>

      <ChartKitchen vertical={vertical} highlight={scene.type === "chart" ? "Rebalance Zone" : "FVG Leftovers"} />

      <ChefAvatar
        pose={scene.chefPose}
        size={vertical ? 330 : 230}
        x={vertical ? 375 : 85}
        y={vertical ? 1210 : 385}
      />

      <div
        style={{
          position: "absolute",
          bottom: vertical ? 110 : 35,
          left: vertical ? "9%" : "8%",
          right: vertical ? "9%" : "8%",
          color: "white",
          fontFamily: "Arial",
          fontSize: vertical ? 31 : 20,
          textAlign: "center",
          fontWeight: 800,
          opacity: 0.88,
        }}
      >
        Educational only — not financial advice.
      </div>
    </AbsoluteFill>
  );
};
