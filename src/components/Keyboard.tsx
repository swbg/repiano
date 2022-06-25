import { Fragment, useEffect, useState } from "react";
import {
  aaFramesPerLoop,
  nKeys,
  strokeInterval,
  whiteKeyHeight,
} from "../const";
import { Score } from "../types";
import { isBlackKey } from "../utils";
import { BlackKey, WhiteKey } from "./Keys";

const getActiveKeys = (score: Score, frame: number, totalFrames: number) => {
  return score.map((voice) => {
    // Calculate cumulative sum of note durations
    const cumSum = (
      (sum: number): ((value: number) => number) =>
      (value: number): number =>
        (sum += value)
    )(0);
    const cumDuration = voice.map((note) => note[1]).map(cumSum);
    // Calculate corresponding duration value currently at top of key
    const currentDuration =
      (frame / totalFrames) * cumDuration[cumDuration.length - 1];
    // Find currently active key index (first cumDuration > currentDuration)
    const currentIndex = cumDuration.findIndex(
      (value) => value > currentDuration
    );
    if (
      currentIndex >= 0 &&
      currentDuration + strokeInterval < cumDuration[currentIndex]
    ) {
      return voice[currentIndex][0];
    }
    return -1;
  });
};

export const Keyboard: React.FC<{
  score: Score;
  frame: number;
  durationInFrames: number;
}> = ({ score, frame, durationInFrames }) => {
  const [activeCounter, setActiveCounter] = useState(
    Array.from({ length: nKeys }).map(() => aaFramesPerLoop + 1)
  );
  const activeKeys = getActiveKeys(score, frame, durationInFrames);

  useEffect(() => {
    setActiveCounter((activeCounter) =>
      activeCounter.map((v, keyIdx) =>
        activeKeys.indexOf(keyIdx) >= 0
          ? 0
          : Math.min(v + 1, aaFramesPerLoop + 1)
      )
    );
  }, [frame]);

  return (
    <div className="keys">
      <div className="whiteKeySeparator" style={{ height: whiteKeyHeight }} />
      {Array.from({ length: nKeys }).map((_, keyIdx) => {
        if (isBlackKey(keyIdx)) {
          return (
            <BlackKey
              key={keyIdx}
              keyIdx={keyIdx}
              color={activeKeys.indexOf(keyIdx)}
              frame={frame}
              activeCounter={activeCounter[keyIdx]}
            />
          );
        } else {
          return (
            <Fragment key={`frag-${keyIdx}`}>
              <WhiteKey
                key={keyIdx}
                keyIdx={keyIdx}
                color={activeKeys.indexOf(keyIdx)}
                frame={frame}
                activeCounter={activeCounter[keyIdx]}
              />
              <div
                key={`sep-${keyIdx}`}
                className="whiteKeySeparator"
                style={{ height: whiteKeyHeight }}
              />
            </Fragment>
          );
        }
      })}
    </div>
  );
};
