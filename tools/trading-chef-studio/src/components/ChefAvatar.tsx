import React from "react";
import { Img, staticFile } from "remotion";
import type { ChefPose } from "../types/sceneTypes";

type Props = {
  pose?: ChefPose;
  size?: number;
  x?: number;
  y?: number;
};

const poseFile: Record<ChefPose, string> = {
  confident: "chef/chef-confident.png",
  teaching: "chef/chef-teaching.png",
  warning: "chef/chef-warning.png",
  celebrating: "chef/chef-celebrating.png",
};

export const ChefAvatar: React.FC<Props> = ({
  pose = "confident",
  size = 220,
  x = 70,
  y = 390,
}) => {
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
        border: "7px solid white",
        boxShadow: "0 18px 42px rgba(0,0,0,0.4)",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial",
        fontWeight: 900,
        textAlign: "center",
        color: "#111",
      }}
    >
      <Img
        src={staticFile(poseFile[pose])}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
        }}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
        }}
      />
      <div>CHEF<br />{pose.toUpperCase()}</div>
    </div>
  );
};
