import {
  barColors,
  blackKeyColors,
  blackKeyWidth,
  minLabelPreviewHeight,
  whiteKeyWidth,
} from "../const";
import { getBaseNote, getKeyPosition, isBlackKey } from "../utils";

export const PreviewBar: React.FC<{
  positionY: number;
  height: number;
  color: number;
  keyIdx: number;
}> = ({ positionY, height, color, keyIdx }) => {
  const flagBlack = isBlackKey(keyIdx);
  return (
    <div
      className="previewBar"
      style={{
        left: getKeyPosition(keyIdx),
        top: positionY,
        height: height,
        backgroundColor: flagBlack ? blackKeyColors[color] : barColors[color],
        width: flagBlack ? blackKeyWidth : whiteKeyWidth,
      }}
    >
      {height > minLabelPreviewHeight && (
        <span className="cIndicator">{getBaseNote(keyIdx)}</span>
      )}
    </div>
  );
};
