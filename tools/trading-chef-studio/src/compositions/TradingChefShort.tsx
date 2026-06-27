import React from "react";
import { Sequence } from "remotion";
import type { TradingChefVideoData } from "../types/sceneTypes";
import { SceneCard } from "../components/SceneCard";

type Props = {
  data: TradingChefVideoData;
};

export const TradingChefShort: React.FC<Props> = ({ data }) => {
  return (
    <>
      {data.scenes.map((scene, index) => (
        <Sequence
          key={scene.id}
          from={index * 270}
          durationInFrames={270}
        >
          <SceneCard scene={scene} vertical />
        </Sequence>
      ))}
    </>
  );
};
