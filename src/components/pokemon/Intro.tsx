import { Img, interpolate, spring, staticFile } from "remotion";
import { songId, songTitle } from "../../config";
import {
  fps,
  introFrames,
  introTransitionFrames,
  introWaitFrames,
  videoHeight,
} from "../../const";
import "./pokemon.css";

// Make background images 512 x 288

export const Intro: React.FC<{ frame: number }> = ({ frame }) => {
  const opacity = interpolate(
    frame,
    [introFrames - introTransitionFrames, introFrames - introWaitFrames],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const logoPosition = spring({
    config: {
      damping: 10,
      mass: 0.6,
      stiffness: 200,
    },
    fps,
    frame,
  });

  const titleOpacity = interpolate(frame, [20, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div className="intro" style={{ opacity }}>
      <Img
        className="introLogo"
        src={staticFile("/img/pokemon/pokemon_logo.svg")}
        style={{ top: 0.5 * videoHeight * (logoPosition - 0.75) }}
      />
      <Img
        className="versionTitle"
        src={staticFile("/img/pokemon/red_and_blue_version.png")}
        style={{ opacity: titleOpacity }}
      />
      <svg className="songTitle" style={{ opacity: titleOpacity }}>
        <text className="songTitleText" y="100%" x="50%">
          {songTitle}
        </text>
      </svg>
      <div className="veil" style={{ opacity: 1 - 0.25 * titleOpacity }} />
      <Img
        className="titleImage"
        src={staticFile(`/img/pokemon/${songId}.png`)}
      />
    </div>
  );
};
