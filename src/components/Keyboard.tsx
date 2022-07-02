import { Midi } from "@tonejs/midi";
import { Fragment, useEffect, useState } from "react";
import {
  aaFramesPerLoop,
  midiIdxOffset,
  nKeys,
  strokeInterval,
  whiteKeyHeight,
} from "../const";
import { isBlackKey } from "../utils";
import { BlackKey, WhiteKey } from "./Keys";

const getActiveKeys = (midi: Midi, frame: number, coreFrames: number) => {
  return midi.tracks.map((track) => {
    // Corresponding duration at top of keyboard
    const curDuration = (frame / coreFrames) * track.duration;

    return track.notes
      .filter(
        (note) =>
          note.time <= curDuration &&
          curDuration <= note.time + note.duration - strokeInterval
      )
      .map((note) => note.midi + midiIdxOffset);
  });
};

export const Keyboard: React.FC<{
  midi: Midi;
  frame: number;
  coreFrames: number;
}> = ({ midi, frame, coreFrames }) => {
  const [activeCounter, setActiveCounter] = useState(
    Array.from({ length: nKeys }).map(() => aaFramesPerLoop + 1)
  );
  const activeKeys = getActiveKeys(midi, frame, coreFrames);

  useEffect(() => {
    const flatActiveKeys = activeKeys.reduce(
      (acc, val) => [...acc, ...val],
      []
    );
    setActiveCounter((activeCounter) =>
      activeCounter.map((v, keyIdx) =>
        flatActiveKeys.indexOf(keyIdx) >= 0
          ? 0
          : Math.min(v + 1, aaFramesPerLoop + 1)
      )
    );
  }, [frame]);

  return (
    <div className="keys">
      <div className="whiteKeySeparator" style={{ height: whiteKeyHeight }} />
      {Array.from({ length: nKeys }).map((_, keyIdx) => {
        const color = Math.max(
          ...activeKeys.map((keys, index) =>
            keys.indexOf(keyIdx) > -1 ? index : -1
          )
        );
        if (isBlackKey(keyIdx)) {
          return (
            <BlackKey
              key={keyIdx}
              keyIdx={keyIdx}
              color={color}
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
                color={color}
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
