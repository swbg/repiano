import { useEffect, useRef, useState } from "react";
import { interpolate, spring } from "remotion";
import { songTitle } from "../../config";
import {
  fps,
  introFrames,
  introTransitionFrames,
  videoHeight,
} from "../../const";
import backgroundGrass from "./assets/background_grass.png";
import pokemonLogo from "./assets/International_Pokémon_logo.svg";
import palletTown from "./assets/pallet_town.png";
import redAndBlue from "./assets/red_and_blue_version.png";
import "./pokemon.css";

const BG_TILE_SIZE = 8;

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

  const titleImage = useRef<HTMLImageElement | null>(null);
  const [bgScaleFactor, setBgScaleFactor] = useState(1);

  useEffect(() => {
    if (titleImage && titleImage.current) {
      setBgScaleFactor(videoHeight / titleImage.current.naturalHeight);
      console.log(videoHeight / titleImage.current.naturalHeight);
    }
  }, [titleImage]);

  return (
    <div
      className="intro"
      style={{
        opacity,
        backgroundImage: `url(${backgroundGrass})`,
        backgroundSize: `${BG_TILE_SIZE * bgScaleFactor}px`,
      }}
    >
      <img
        className="introLogo"
        src={pokemonLogo}
        style={{ top: 0.5 * videoHeight * (logoPosition - 0.75) }}
      />
      <img
        className="versionTitle"
        src={redAndBlue}
        style={{ opacity: titleOpacity }}
      />
      <svg className="songTitle" style={{ opacity: titleOpacity }}>
        <text className="songTitleText" y="100%" x="50%">
          {songTitle}
        </text>
      </svg>
      <div className="veil" style={{ opacity: 1 - 0.25 * titleOpacity }} />
      <img ref={titleImage} className="titleImage" src={palletTown} />
    </div>
  );
};
