import { Midi } from "@tonejs/midi";
import { useCallback, useEffect, useState } from "react";
import { Composition, continueRender, delayRender } from "remotion";
import { Main } from "./components/Main";
import { audioSrc, midiSrc } from "./config";
import { fps, introFrames, outroFrames } from "./const";
import "./index.css";

export const RemotionVideo: React.FC = () => {
  const [handle] = useState(() => delayRender());
  const [midi, setMidi] = useState<Midi>(new Midi());
  const [totalFrames, setTotalFrames] = useState(1);

  const fetchData = useCallback(async () => {
    const midi = await Midi.fromUrl(midiSrc);
    setMidi(midi);

    console.log(midi);

    const totalFrames =
      introFrames + Math.round(midi.duration * fps) + outroFrames;
    setTotalFrames(totalFrames);
    console.log(totalFrames);

    continueRender(handle);
  }, [handle]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Composition
      id="main"
      component={Main}
      fps={fps}
      width={1920}
      height={1080}
      durationInFrames={totalFrames}
      defaultProps={{
        midi,
        audioSrc,
      }}
    />
  );
};
