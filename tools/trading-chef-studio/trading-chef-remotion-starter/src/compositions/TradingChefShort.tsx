import React from "react";
import { Sequence } from "remotion";
import { SceneFrame } from "../components/SceneFrame";

type Props = {
  data: any;
};

export const TradingChefShort: React.FC<Props> = ({ data }) => {
  return (
    <>
      <Sequence from={0} durationInFrames={270}>
        <SceneFrame
          vertical
          title="Gold Got Cooked 🍳"
          subtitle={data.hook}
        />
      </Sequence>

      <Sequence from={270} durationInFrames={270}>
        <SceneFrame
          vertical
          title="Do Not Chase"
          subtitle="The candle already moved. Let the recipe reset."
        />
      </Sequence>

      <Sequence from={540} durationInFrames={270}>
        <SceneFrame
          vertical
          title="Wait For Chef Approval"
          subtitle="Confirmation before entry. Portion control always."
        />
      </Sequence>

      <Sequence from={810} durationInFrames={270}>
        <SceneFrame
          vertical
          title="Daily Chart Recipes"
          subtitle="Follow The Trading Chef."
        />
      </Sequence>

      <Sequence from={1080} durationInFrames={270}>
        <SceneFrame
          vertical
          title="Educational Only"
          subtitle="Not financial advice."
        />
      </Sequence>
    </>
  );
};
