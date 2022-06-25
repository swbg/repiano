import { Audio, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "./components/Background";
import { Outro } from "./components/generic/Outro";
import { Keyboard } from "./components/Keyboard";
import { Intro } from "./components/pokemon/Intro";
import { TopBar } from "./components/pokemon/TopBar";
import { PreviewArea } from "./components/PreviewArea";
import {
  introBreakMultiplier,
  introFrames,
  introTransitionFrames,
  outroFrames,
  outroTransitionFrames,
  pureIntroFrames,
  pureOutroFrames,
  whiteKeyHeight,
} from "./const";
import { Score } from "./types";

export const Main: React.FC<{
  score: Score;
  audio: string;
}> = ({ score, audio }) => {
  const frame = useCurrentFrame();
  const config = useVideoConfig();

  const mainDurationInFrames =
    config.durationInFrames - pureIntroFrames - pureOutroFrames;
  introBreakMultiplier;
  return (
    <div className="main">
      <Sequence from={0} durationInFrames={introFrames}>
        <Intro frame={frame} />
      </Sequence>
      <Sequence
        from={introFrames - introTransitionFrames}
        durationInFrames={mainDurationInFrames}
      >
        <Background />
        <PreviewArea
          score={score}
          frame={frame - pureIntroFrames}
          durationInFrames={mainDurationInFrames}
        />
        <div className="separator1" style={{ bottom: whiteKeyHeight + 2 }} />
        <div className="separator2" style={{ bottom: whiteKeyHeight + 1 }} />
        <Keyboard
          score={score}
          frame={frame - pureIntroFrames}
          durationInFrames={mainDurationInFrames}
        />
        <TopBar frame={frame - pureIntroFrames} />
      </Sequence>
      <Sequence
        from={introFrames + (introBreakMultiplier - 1) * introTransitionFrames}
        durationInFrames={
          mainDurationInFrames -
          introBreakMultiplier * introTransitionFrames -
          outroTransitionFrames
        }
      >
        <Audio src={audio} />
      </Sequence>
      <Sequence
        from={config.durationInFrames - outroFrames}
        durationInFrames={outroFrames}
      >
        <Outro frame={frame} totalFrames={config.durationInFrames} />
      </Sequence>
    </div>
  );
};
