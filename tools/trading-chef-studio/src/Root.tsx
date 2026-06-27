import React from "react";
import { Composition } from "remotion";
import { TradingChefFVG } from "./compositions/TradingChefFVG";
import { TradingChefShort } from "./compositions/TradingChefShort";
import { fvgRecipeVideo } from "./data/videoData";

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="TradingChefFVG"
        component={TradingChefFVG}
        durationInFrames={1080}
        fps={30}
        width={1280}
        height={720}
        defaultProps={{ data: fvgRecipeVideo }}
      />

      <Composition
        id="TradingChefShort"
        component={TradingChefShort}
        durationInFrames={1350}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ data: fvgRecipeVideo }}
      />
    </>
  );
};
