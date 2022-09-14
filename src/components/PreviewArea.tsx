import { Midi } from "@tonejs/midi";
import { midiIdxOffset, previewDuration, previewHeight } from "../const";
import { PreviewBar } from "./PreviewBar";
import { VerticalIndicator } from "./VerticalIndicator";

const getPreviewedKeys = (midi: Midi, frame: number, coreFrames: number) => {
  return midi.tracks.map((track) => {
    // Corresponding duration at bottom of preview area (top of keyboard)
    const firstDuration = (frame / coreFrames) * track.duration;
    // Corresponding duration at top of preview area (top of screen)
    const lastDuration = firstDuration + previewDuration;

    return track.notes
      .filter(
        (note) =>
          note.time + note.duration >= firstDuration &&
          note.time <= lastDuration
      )
      .map((note) => {
        const positionY =
          (1 - (note.time + note.duration - firstDuration) / previewDuration) *
          previewHeight;
        const height = (note.duration / previewDuration) * previewHeight;

        return { positionY, height, keyIdx: note.midi + midiIdxOffset };
      });
  });
};

const getVerticalIndicators = (
  midi: Midi,
  frame: number,
  coreFrames: number
) => {
  const firstDuration = (frame / coreFrames) * midi.duration;
  const lastDuration = firstDuration + previewDuration;

  // Calculate bar length
  const timeSignature = midi.header.timeSignatures[0].timeSignature;
  const bps = midi.header.tempos[0].bpm / 60;
  const barLength = ((bps * timeSignature[0]) / timeSignature[1]) * 4;

  const visibleIndicators = [];
  for (let i = 0; i * barLength < lastDuration; i++) {
    if (i * barLength > firstDuration) {
      visibleIndicators.push(i);
    }
  }

  return visibleIndicators.map((i) => {
    return (
      (1 - (i * barLength - firstDuration) / previewDuration) * previewHeight
    );
  });
};

export const PreviewArea: React.FC<{
  midi: Midi;
  frame: number;
  coreFrames: number;
  showVerticalIndicators: boolean;
}> = ({ midi, frame, coreFrames, showVerticalIndicators }) => {
  const previewBars = getPreviewedKeys(midi, frame, coreFrames);

  return (
    <div className="previewArea">
      {previewBars.map((barsPerVoice, idx) =>
        barsPerVoice.map((bar, barIdx) => (
          <PreviewBar
            key={`bar-${idx}-${barIdx}`}
            positionY={bar.positionY}
            height={bar.height}
            color={idx}
            keyIdx={bar.keyIdx}
          />
        ))
      )}
      {showVerticalIndicators &&
        getVerticalIndicators(midi, frame, coreFrames).map((positionY, idx) => (
          <VerticalIndicator key={`vi-${idx}`} positionY={positionY} />
        ))}
    </div>
  );
};
