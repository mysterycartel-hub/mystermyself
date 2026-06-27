import React from "react";

type Props = {
  children: React.ReactNode;
  size?: number;
  top?: number;
  vertical?: boolean;
};

export const SafeText: React.FC<Props> = ({
  children,
  size = 56,
  top = 80,
  vertical = false,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top,
        left: vertical ? "10%" : "8%",
        right: vertical ? "10%" : "8%",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        fontWeight: 900,
        fontSize: size,
        lineHeight: 1.05,
        color: "white",
        textShadow: "0 6px 18px rgba(0,0,0,0.65)",
        zIndex: 20,
      }}
    >
      {children}
    </div>
  );
};
