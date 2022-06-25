import { barLength, previewDuration, previewHeight } from "../const";
import { Score } from "../types";
import { getTotalDuration } from "../utils";
import { PreviewBar } from "./PreviewBar";
import { VerticalIndicator } from "./VerticalIndicator";

const getPreviewedKeys = (score: Score, frame: number, totalFrames: number) => {
  return score.map((voice) => {
    const cumSum = (
      (sum: number): ((value: number) => number) =>
      (value: number): number =>
        (sum += value)
    )(0);
    const cumDuration = voice.map((note) => note[1]).map(cumSum);
    const firstDuration =
      (frame / totalFrames) * cumDuration[cumDuration.length - 1];
    const lastDuration = firstDuration + previewDuration;
    const firstIndex = cumDuration.findIndex((value) => value > firstDuration);
    const lastIndex = cumDuration.findIndex((value) => value > lastDuration);

    return voice
      .slice(firstIndex, lastIndex < 0 ? undefined : lastIndex + 1)
      .map((note, index) => {
        const startDuration = cumDuration[firstIndex + index];

        const positionY =
          (1 - (startDuration - firstDuration) / previewDuration) *
          previewHeight;
        const height = (note[1] / previewDuration) * previewHeight;

        return { positionY, height, keyIdx: note[0] };
      });
  });
};

const getVerticalIndicators = (
  score: Score,
  frame: number,
  totalFrames: number
) => {
  const totalDuration = getTotalDuration(score);
  const firstDuration = (frame / totalFrames) * totalDuration;
  const lastDuration = firstDuration + previewDuration;

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
  score: Score;
  frame: number;
  durationInFrames: number;
}> = ({ score, frame, durationInFrames }) => {
  const previewBars = getPreviewedKeys(score, frame, durationInFrames);
  const verticalIndicators = getVerticalIndicators(
    score,
    frame,
    durationInFrames
  );

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
      {verticalIndicators.map((positionY, idx) => (
        <VerticalIndicator key={`vi-${idx}`} positionY={positionY} />
      ))}
    </div>
  );
};
