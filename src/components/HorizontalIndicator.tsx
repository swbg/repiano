import { getKeyPosition } from "../utils";

export const HorizontalIndicator: React.FC<{ keyIdx: number }> = ({
  keyIdx,
}) => {
  return (
    <div
      className="horizontalIndicator"
      style={{
        left: getKeyPosition(keyIdx) - 1,
      }}
    />
  );
};
