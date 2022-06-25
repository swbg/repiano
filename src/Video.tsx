import { Composition } from "remotion";
import { audio, score } from "./config";
import {
  fps,
  introBreakMultiplier,
  introTransitionFrames,
  outroTransitionFrames,
  pureIntroFrames,
  pureOutroFrames,
  secondsPerBeat,
  speedMultiplier,
  ticksPerBeat,
} from "./const";
import "./index.css";
import { Main } from "./Main";
import { Score } from "./types";
import { getTotalDuration } from "./utils";

export const RemotionVideo: React.FC = () => {
  const framesMultiplier =
    (fps * speedMultiplier * secondsPerBeat) / ticksPerBeat;
  const introDuration =
    (introBreakMultiplier * introTransitionFrames) / framesMultiplier;
  const outroDuration = outroTransitionFrames / framesMultiplier;

  const paddedScore: Score = score.map((voice) => [
    [-1, introDuration],
    ...voice,
    [-1, outroDuration],
  ]);
  const totalFrames =
    pureIntroFrames +
    Math.round(getTotalDuration(paddedScore) * framesMultiplier) +
    pureOutroFrames;

  return (
    <Composition
      id="main"
      component={Main}
      fps={fps}
      width={1920}
      height={1080}
      durationInFrames={totalFrames}
      defaultProps={{
        score: paddedScore,
        audio,
      }}
    />
  );
};
