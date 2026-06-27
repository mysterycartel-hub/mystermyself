import React from "react";
import { Img, staticFile } from "remotion";

type ChefAvatarProps = {
  size?: number;
  x?: number;
  y?: number;
};

export const ChefAvatar: React.FC<ChefAvatarProps> = ({
  size = 210,
  x = 80,
  y = 360,
}) => {
  const src = staticFile("chef/chef-avatar.png");

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: "50%",
        background: "linear-gradient(135deg, #ffcc4d, #ff7a00)",
        border: "8px solid white",
        boxShadow: "0 15px 35px rgba(0,0,0,0.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        fontSize: size * 0.18,
        fontWeight: 900,
        color: "#111",
        textAlign: "center",
      }}
    >
      <Img
        src={src}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        onError={(e) => {
          const img = e.currentTarget as HTMLImageElement;
          img.style.display = "none";
        }}
      />
      <div style={{ position: "absolute" }}>CHEF<br />AVATAR</div>
    </div>
  );
};
