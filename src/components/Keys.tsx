import { random } from "remotion";
import {
  aaFramesPerLoop,
  blackKeyColors,
  blackKeyDarkShadowColors,
  blackKeyHeight,
  blackKeyShadowColors,
  blackKeyWidth,
  keyColors,
  whiteKeyHeight,
  whiteKeyWidth,
} from "../const";
import { getBaseNote, getCNote, isShiftedLeft, isShiftedRight } from "../utils";

const KeyAnimation: React.FC<{
  frame: number;
  width: number;
  clip: number;
}> = ({ frame, width, clip }) => {
  const ELEMENTS_PER_PIXEL = 3;
  if (clip === undefined || aaFramesPerLoop <= clip) {
    return null;
  }
  return (
    <div className="keyAnimation" style={{ width: width }}>
      {Array.from({ length: ELEMENTS_PER_PIXEL * width }).map((_, i) => {
        const rand = random(i);
        const posInLoop = (frame + rand * aaFramesPerLoop) % aaFramesPerLoop;
        if (posInLoop < clip) {
          return null;
        }
        const relPosInLoop = posInLoop / aaFramesPerLoop;
        const yMultiplier =
          1 - 2 * Math.pow(i / ELEMENTS_PER_PIXEL / width - 0.5, 2);
        // Opacity increases linearly 20% of time then decreases linearly
        const posFullOpacity = Math.ceil(0.05 * aaFramesPerLoop);
        const opacity =
          posInLoop < posFullOpacity
            ? posInLoop / posFullOpacity
            : 1 -
              (posInLoop - posFullOpacity) / (aaFramesPerLoop - posFullOpacity);
        // Scale decreases linearly to top and quadratically to sides
        const scale = (1 - relPosInLoop) * yMultiplier;
        // Translate linearly upwards
        const translateY = relPosInLoop * yMultiplier;
        return (
          <div
            key={i}
            className="keyAnimationElement"
            style={{
              marginRight: i % ELEMENTS_PER_PIXEL == 0 ? "-15px" : "-16px",
              opacity: `${60 * opacity}%`,
              transform: `scale(${scale}) rotate(${32 * (rand - 0.5)}deg)`,
              bottom: 50 * translateY,
            }}
          />
        );
      })}
    </div>
  );
};

export const WhiteKey: React.FC<{
  keyIdx: number;
  color: number;
  frame: number;
  animated: number;
}> = ({ keyIdx, color, frame, animated }) => {
  const style = {
    height: whiteKeyHeight,
    width: whiteKeyWidth,
  };
  if (color >= 0) {
    return (
      <div
        className="whiteKey whiteKeyActive"
        style={{
          ...style,
          backgroundColor: keyColors[color],
        }}
      >
        <KeyAnimation frame={frame} width={whiteKeyWidth} clip={animated} />
        <span className="cIndicator">{getCNote(keyIdx)}</span>
        <span className="activeIndicator">{getBaseNote(keyIdx)}</span>
      </div>
    );
  }
  return (
    <div className="whiteKey" style={style}>
      <KeyAnimation frame={frame} width={whiteKeyWidth} clip={animated} />
      <span className="cIndicator">{getCNote(keyIdx)}</span>
    </div>
  );
};

export const BlackKey: React.FC<{
  keyIdx: number;
  color: number;
  frame: number;
  animated: number;
}> = ({ keyIdx, color, frame, animated }) => {
  const style = {
    height: blackKeyHeight,
    width: blackKeyWidth,
    marginLeft: -blackKeyWidth / 2,
    marginRight: -blackKeyWidth / 2,
  };
  if (isShiftedLeft(keyIdx)) {
    style.marginLeft -= blackKeyWidth / 8;
    style.marginRight += blackKeyWidth / 8;
  } else if (isShiftedRight(keyIdx)) {
    style.marginLeft += blackKeyWidth / 8;
    style.marginRight -= blackKeyWidth / 8;
  }
  if (color >= 0) {
    return (
      <div
        className="blackKey blackKeyActive"
        style={{
          ...style,
          backgroundColor: blackKeyColors[color],
        }}
      >
        <KeyAnimation frame={frame} width={blackKeyWidth} clip={animated} />
        <div
          className="blackKeyInnerActive"
          style={{
            borderBottom: `10px solid ${blackKeyShadowColors[color]}`,
            borderLeft: `5px solid ${blackKeyDarkShadowColors[color]}`,
            borderRight: `5px solid ${blackKeyDarkShadowColors[color]}`,
          }}
        />
      </div>
    );
  }
  return (
    <div className="blackKey" style={style}>
      <KeyAnimation frame={frame} width={blackKeyWidth} clip={animated} />
      <div className="blackKeyInner" />
    </div>
  );
};
