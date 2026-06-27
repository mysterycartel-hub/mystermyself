import React from "react";
import { Sequence } from "remotion";
import { SceneFrame } from "../components/SceneFrame";

type Props = {
  data: any;
};

export const TradingChefDaily: React.FC<Props> = ({ data }) => {
  return (
    <>
      <Sequence from={0} durationInFrames={180}>
        <SceneFrame
          title={data.title}
          subtitle={data.hook}
        />
      </Sequence>

      <Sequence from={180} durationInFrames={180}>
        <SceneFrame
          title="Kitchen Status"
          subtitle="Liquidity swept. Now wait for chef approval."
        />
      </Sequence>

      <Sequence from={360} durationInFrames={180}>
        <SceneFrame
          title="The Recipe"
          subtitle="Do not chase candles. Let the setup cook."
        />
      </Sequence>

      <Sequence from={540} durationInFrames={180}>
        <SceneFrame
          title="Portion Control"
          subtitle="Risk management keeps the kitchen alive."
        />
      </Sequence>

      <Sequence from={720} durationInFrames={180}>
        <SceneFrame
          title="Follow The Trading Chef"
          subtitle={data.cta}
        />
      </Sequence>
    </>
  );
};
