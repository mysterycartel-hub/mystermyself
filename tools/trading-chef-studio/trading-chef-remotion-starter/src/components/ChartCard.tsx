import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

type ChartCardProps = {
  vertical?: boolean;
};

export const ChartCard: React.FC<ChartCardProps> = ({ vertical = false }) => {
  const frame = useCurrentFrame();
  const glow = interpolate(frame % 90, [0, 45, 90], [0.2, 0.8, 0.2]);

  return (
    <div
      style={{
        position: "absolute",
        left: vertical ? 80 : 500,
        top: vertical ? 520 : 170,
        width: vertical ? 920 : 660,
        height: vertical ? 560 : 360,
        borderRadius: 30,
        background: "rgba(10,18,30,0.92)",
        border: `4px solid rgba(255,200,75,${glow})`,
        boxShadow: "0 20px 50px rgba(0,0,0,0.45)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 24,
          left: 30,
          color: "#ffcc4d",
          fontFamily: "Arial",
          fontWeight: 800,
          fontSize: vertical ? 34 : 26,
        }}
      >
        XAUUSD Kitchen Map
      </div>

      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 45 + i * (vertical ? 150 : 110),
            bottom: 80 + (i % 2) * 70,
            width: vertical ? 70 : 50,
            height: 160 + i * 28,
            background: i % 2 === 0 ? "#3ee07b" : "#ff4d4d",
            borderRadius: 10,
            boxShadow: "0 0 20px rgba(255,255,255,0.2)",
          }}
        />
      ))}

      <div
        style={{
          position: "absolute",
          right: 35,
          bottom: 35,
          padding: "14px 18px",
          borderRadius: 18,
          background: "rgba(255,204,77,0.95)",
          color: "#111",
          fontFamily: "Arial",
          fontWeight: 900,
          fontSize: vertical ? 28 : 20,
        }}
      >
        Liquidity Ingredients
      </div>
    </div>
  );
};
