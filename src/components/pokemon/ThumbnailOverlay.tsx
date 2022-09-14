import { Img, staticFile } from "remotion";
import { songId, songTitle } from "../../config";
import { videoHeight } from "../../const";
import "./pokemon.css";

export const ThumbnailOverlay: React.FC<{}> = () => {
  return (
    <div className="intro">
      {[1, 2, 3, 4, 5].map((_) => (
        <Img
          className="introLogoThumbnail"
          src={staticFile("/img/pokemon/pokemon_logo_outlined.svg")}
          style={{ top: 0.125 * videoHeight - 20, zIndex: 5000 }}
        />
      ))}

      <Img
        className="versionTitle"
        src={staticFile("/img/pokemon/red_and_blue_version.png")}
        style={{ top: 0.4 * videoHeight }}
      />
      <svg className="songTitle" style={{ top: 0.55 * videoHeight }}>
        <text className="songTitleTextThumbnail" y="100%" x="50%">
          {songTitle}
        </text>
      </svg>
      <div className="darkVeil" style={{ opacity: 0.9 }} />
      <Img
        className="titleImage"
        src={staticFile(`/img/pokemon/${songId}.png`)}
        style={{ zIndex: -1 }}
      />
    </div>
  );
};
