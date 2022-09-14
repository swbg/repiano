import { Midi } from "@tonejs/midi";
import { Audio, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import {
  introFrames,
  introTransitionFrames,
  outroFrames,
  pureIntroFrames,
  pureOutroFrames,
  whiteKeyHeight,
} from "../const";
import { Outro } from "./generic/Outro";
import { Keyboard } from "./Keyboard";
import { Background } from "./pokemon/Background";
import { Intro } from "./pokemon/Intro";
import { TopBar } from "./pokemon/TopBar";
import { PreviewArea } from "./PreviewArea";

export const Main: React.FC<{
  midi: Midi;
  audioSrc: string;
}> = ({ midi, audioSrc }) => {
  const frame = useCurrentFrame();
  const config = useVideoConfig();

  const coreFrames = Math.max(
    1,
    config.durationInFrames - introFrames - outroFrames
  );

  return (
    <div className="main">
      <Sequence name="Intro" from={0} durationInFrames={introFrames}>
        <Intro frame={frame} />
      </Sequence>
      <Sequence
        name="Keyboard"
        from={introFrames - introTransitionFrames}
        durationInFrames={Math.max(
          1,
          config.durationInFrames - pureIntroFrames - pureOutroFrames
        )}
      >
        <Background />
        <PreviewArea
          midi={midi}
          frame={frame - introFrames}
          coreFrames={coreFrames}
          showVerticalIndicators={true}
        />
        <div className="separator1" style={{ bottom: whiteKeyHeight + 2 }} />
        <div className="separator2" style={{ bottom: whiteKeyHeight + 1 }} />
        <Keyboard
          midi={midi}
          frame={frame - introFrames}
          coreFrames={coreFrames}
        />
        <TopBar frame={frame - pureIntroFrames} />
      </Sequence>
      <Sequence name="Audio" from={introFrames} durationInFrames={coreFrames}>
        <Audio src={audioSrc} />
      </Sequence>
      <Sequence
        name="Outro"
        from={config.durationInFrames - outroFrames}
        durationInFrames={outroFrames}
      >
        <Outro frame={frame} totalFrames={config.durationInFrames} />
      </Sequence>
    </div>
  );
};
