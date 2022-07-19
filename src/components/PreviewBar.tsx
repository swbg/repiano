import {
  blackKeyColors,
  blackKeyWidth,
  keyColors,
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
        left: getKeyPosition(keyIdx) + 1,
        top: positionY + 2,
        height: height - 2,
        backgroundColor: flagBlack ? blackKeyColors[color] : keyColors[color],
        width: flagBlack ? blackKeyWidth - 2 : whiteKeyWidth - 2,
      }}
    >
      {height > minLabelPreviewHeight && (
        <span className="cIndicator">{getBaseNote(keyIdx)}</span>
      )}
    </div>
  );
};
