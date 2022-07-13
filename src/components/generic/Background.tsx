import { watermark } from "../../const";
import { HorizontalIndicator } from "../HorizontalIndicator";

export const Background: React.FC<{}> = () => {
  return (
    <div className="background">
      <span className="watermark">{watermark}</span>
      {[3, 15, 27, 39, 51, 63, 75, 87].map((keyIdx) => (
        <HorizontalIndicator key={`hi-${keyIdx}`} keyIdx={keyIdx} />
      ))}
    </div>
  );
};
