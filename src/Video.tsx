import { Midi } from "@tonejs/midi";
import { useCallback, useEffect, useState } from "react";
import { Composition, continueRender, delayRender } from "remotion";
import { Main } from "./components/Main";
import { Thumbnail } from "./components/Thumbnail";
import { audioSrc, midiSrc } from "./config";
import {
  fps,
  introFrames,
  outroFrames,
  videoHeight,
  videoWidth,
} from "./const";
import "./index.css";

export const RemotionVideo: React.FC = () => {
  const [handle] = useState(() => delayRender());
  const [midi, setMidi] = useState<Midi>(new Midi());
  const [totalFrames, setTotalFrames] = useState(1);

  const fetchData = useCallback(async () => {
    const midi = await Midi.fromUrl(midiSrc);
    setMidi(midi);

    const totalFrames =
      introFrames + Math.round(midi.duration * fps) + outroFrames;
    setTotalFrames(totalFrames);

    continueRender(handle);
  }, [handle]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <Composition
        id="Main"
        component={Main}
        fps={fps}
        width={videoWidth}
        height={videoHeight}
        durationInFrames={totalFrames}
        defaultProps={{ midi, audioSrc }}
      />
      <Composition
        id="Thumbnail"
        component={Thumbnail}
        fps={fps}
        width={videoWidth}
        height={videoHeight}
        durationInFrames={totalFrames}
        defaultProps={{ midi }}
      />
    </>
  );
};
