import { Midi } from "@tonejs/midi";
import { Fragment } from "react";
import {
  aaFramesPerLoop,
  fps,
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

const getAnimatedKeys = (midi: Midi, frame: number, coreFrames: number) => {
  return midi.tracks
    .map((track) => {
      // Corresponding duration at top of keyboard
      const curDuration = (frame / coreFrames) * track.duration;

      return track.notes
        .filter(
          (note) =>
            note.time <= curDuration &&
            curDuration <= note.time + note.duration + aaFramesPerLoop / fps
        )
        .map((note) => ({
          keyIdx: note.midi + midiIdxOffset,
          count: Math.max(0, (curDuration - note.time - note.duration) * fps),
        }));
    })
    .reduce<{ [key: number]: number }>(
      (midiAcc, midiItem) => ({
        ...midiAcc,
        ...midiItem.reduce<{ [key: number]: number }>(
          (trackAcc, trackItem) => ({
            ...trackAcc,
            [trackItem.keyIdx]: Math.min(
              trackItem.count,
              midiAcc[trackItem.keyIdx] || aaFramesPerLoop
            ),
          }),
          {}
        ),
      }),
      {}
    );
};

export const Keyboard: React.FC<{
  midi: Midi;
  frame: number;
  coreFrames: number;
}> = ({ midi, frame, coreFrames }) => {
  const activeKeys = getActiveKeys(midi, frame, coreFrames);
  const animatedKeys = getAnimatedKeys(midi, frame, coreFrames);

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
              animated={animatedKeys[keyIdx]}
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
                animated={animatedKeys[keyIdx]}
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
