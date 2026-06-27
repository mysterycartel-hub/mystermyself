import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

type Props = {
  vertical?: boolean;
  highlight?: string;
};

export const ChartKitchen: React.FC<Props> = ({ vertical = false, highlight = "FVG Leftovers" }) => {
  const frame = useCurrentFrame();
  const pulse = interpolate(frame % 60, [0, 30, 60], [0.35, 1, 0.35]);

  return (
    <div
      style={{
        position: "absolute",
        left: vertical ? 80 : 465,
        top: vertical ? 560 : 190,
        width: vertical ? 920 : 690,
        height: vertical ? 560 : 350,
        borderRadius: 30,
        background: "rgba(5, 10, 20, 0.94)",
        border: `4px solid rgba(255, 204, 77, ${pulse})`,
        boxShadow: "0 20px 55px rgba(0,0,0,0.5)",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", inset: 0, opacity: 0.15, backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      {[0,1,2,3,4].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: vertical ? 100 + i * 145 : 85 + i * 105,
            bottom: vertical ? 120 + (i % 2) * 55 : 85 + (i % 2) * 45,
            width: vertical ? 62 : 44,
            height: vertical ? 170 + i * 22 : 120 + i * 22,
            borderRadius: 9,
            background: i % 2 === 0 ? "#34e27a" : "#ff4d4d",
          }}
        />
      ))}
      <div style={{
        position: "absolute",
        left: vertical ? 340 : 290,
        top: vertical ? 220 : 135,
        width: vertical ? 310 : 210,
        height: vertical ? 120 : 80,
        background: `rgba(255, 204, 77, ${0.25 + pulse * 0.3})`,
        border: "3px dashed #ffcc4d",
        borderRadius: 18,
      }} />
      <div
        style={{
          position: "absolute",
          right: 26,
          bottom: 24,
          padding: "12px 16px",
          background: "#ffcc4d",
          borderRadius: 16,
          fontFamily: "Arial",
          fontWeight: 900,
          fontSize: vertical ? 30 : 22,
          color: "#111",
        }}
      >
        {highlight}
      </div>
    </div>
  );
};
