import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { SafeText } from "./SafeText";
import { ChefAvatar } from "./ChefAvatar";
import { ChartCard } from "./ChartCard";

type SceneFrameProps = {
  title: string;
  subtitle: string;
  vertical?: boolean;
};

export const SceneFrame: React.FC<SceneFrameProps> = ({
  title,
  subtitle,
  vertical = false,
}) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 30], [0.96, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 30% 20%, #ff7a00 0%, #1a1028 34%, #05070d 100%)",
        transform: `scale(${scale})`,
      }}
    >
      <SafeText size={vertical ? 74 : 58} top={vertical ? 150 : 65}>
        {title}
      </SafeText>

      <SafeText size={vertical ? 42 : 32} top={vertical ? 330 : 145}>
        {subtitle}
      </SafeText>

      <ChartCard vertical={vertical} />

      <ChefAvatar
        size={vertical ? 330 : 220}
        x={vertical ? 375 : 90}
        y={vertical ? 1210 : 385}
      />

      <div
        style={{
          position: "absolute",
          bottom: vertical ? 95 : 28,
          left: "8%",
          right: "8%",
          textAlign: "center",
          color: "white",
          opacity: 0.85,
          fontFamily: "Arial",
          fontWeight: 700,
          fontSize: vertical ? 30 : 20,
        }}
      >
        Educational only — not financial advice.
      </div>
    </AbsoluteFill>
  );
};
