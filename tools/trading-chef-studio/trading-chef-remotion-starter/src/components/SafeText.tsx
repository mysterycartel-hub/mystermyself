import React from "react";

type SafeTextProps = {
  children: React.ReactNode;
  size?: number;
  top?: number;
  align?: "left" | "center" | "right";
};

export const SafeText: React.FC<SafeTextProps> = ({
  children,
  size = 54,
  top = 80,
  align = "center",
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top,
        left: "8%",
        right: "8%",
        textAlign: align,
        fontFamily: "Arial, sans-serif",
        fontWeight: 900,
        fontSize: size,
        lineHeight: 1.05,
        color: "white",
        textShadow: "0 6px 18px rgba(0,0,0,0.55)",
        zIndex: 10,
      }}
    >
      {children}
    </div>
  );
};
