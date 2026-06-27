import React from "react";
import { Composition } from "remotion";
import { TradingChefDaily } from "./compositions/TradingChefDaily";
import { TradingChefShort } from "./compositions/TradingChefShort";
import { dailyVideoData } from "./data/videoData";

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="TradingChefDaily"
        component={TradingChefDaily}
        durationInFrames={900}
        fps={30}
        width={1280}
        height={720}
        defaultProps={{ data: dailyVideoData }}
      />

      <Composition
        id="TradingChefShort"
        component={TradingChefShort}
        durationInFrames={1350}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ data: dailyVideoData }}
      />
    </>
  );
};
