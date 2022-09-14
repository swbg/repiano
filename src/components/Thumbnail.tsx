import { Midi } from "@tonejs/midi";
import { Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import {
  introFrames,
  outroFrames,
  pureIntroFrames,
  whiteKeyHeight,
} from "../const";
import { Keyboard } from "./Keyboard";
import { Background } from "./pokemon/Background";
import { ThumbnailOverlay } from "./pokemon/ThumbnailOverlay";
import { TopBar } from "./pokemon/TopBar";
import { PreviewArea } from "./PreviewArea";

export const Thumbnail: React.FC<{
  midi: Midi;
}> = ({ midi }) => {
  const frame = useCurrentFrame();
  const config = useVideoConfig();

  const coreFrames = Math.max(
    1,
    config.durationInFrames - introFrames - outroFrames
  );

  return (
    <div className="main">
      <PreviewArea
        midi={midi}
        frame={frame - introFrames}
        coreFrames={coreFrames}
        showVerticalIndicators={false}
      />
      <div className="separator1" style={{ bottom: whiteKeyHeight + 2 }} />
      <div className="separator2" style={{ bottom: whiteKeyHeight + 1 }} />
      <Keyboard
        midi={midi}
        frame={frame - introFrames}
        coreFrames={coreFrames}
      />
      <ThumbnailOverlay />
    </div>
  );
};
