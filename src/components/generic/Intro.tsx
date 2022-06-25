import { interpolate } from "remotion";
import { songTitle } from "../../config";
import { introFrames, introTransitionFrames } from "../../const";
import "./generic.css";

export const Intro: React.FC<{ frame: number }> = ({ frame }) => {
  const opacity = interpolate(
    frame,
    [introFrames - introTransitionFrames, introFrames],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <div
      className="intro"
      style={{
        opacity,
      }}
    >
      {songTitle}
    </div>
  );
};
