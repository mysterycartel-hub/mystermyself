import React from "react";
import { Sequence } from "remotion";
import type { TradingChefVideoData } from "../types/sceneTypes";
import { SceneCard } from "../components/SceneCard";

type Props = {
  data: TradingChefVideoData;
};

export const TradingChefFVG: React.FC<Props> = ({ data }) => {
  return (
    <>
      {data.scenes.map((scene) => (
        <Sequence
          key={scene.id}
          from={scene.start * 30}
          durationInFrames={scene.duration * 30}
        >
          <SceneCard scene={scene} />
        </Sequence>
      ))}
    </>
  );
};
