import { interpolate } from "remotion";
import { outroFrames, outroTransitionFrames } from "../../const";
import "./generic.css";

export const Outro: React.FC<{ frame: number; totalFrames: number }> = ({
  frame,
  totalFrames,
}) => {
  const opacity = interpolate(
    frame,
    [
      totalFrames - outroFrames,
      totalFrames - outroFrames + outroTransitionFrames,
    ],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return <div className="outro" style={{ opacity }} />;
};
