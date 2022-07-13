import { Img, staticFile } from "remotion";
import { videoHeight, watermark } from "../../const";
import { HorizontalIndicator } from "../HorizontalIndicator";

export const Background: React.FC<{}> = () => {
  return (
    <div className="background">
      <Img
        className="introLogo"
        src={staticFile("/img/pokemon/pokemon_logo.svg")}
        style={{
          opacity: 0.04,
          top: 0.125 * videoHeight,
        }}
      />
      <span className="watermark">{watermark}</span>
      {[3, 15, 27, 39, 51, 63, 75, 87].map((keyIdx) => (
        <HorizontalIndicator key={`hi-${keyIdx}`} keyIdx={keyIdx} />
      ))}
    </div>
  );
};
