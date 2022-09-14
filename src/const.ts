import { staticFile } from "remotion";

const addToColor = (color: string, a: number) => {
  return (
    "#" +
    [color.substr(1, 2), color.substr(3, 2), color.substr(5, 2)]
      .map((v) => Math.min(255, Math.max(0, parseInt(v, 16) + a)))
      .map((v) => (v < 16 ? "0" + v.toString(16) : v.toString(16)))
      .join("")
  );
};

// Timing
export const fps = 30;

// Layout and sizes
export const videoWidth = 1920;
export const videoHeight = 1080;
export const nWhiteKeys = 52;
export const nBlackKeys = 36;
export const nKeys = nWhiteKeys + nBlackKeys;

const pxPerCm = 22.7;
export const whiteKeyWidth = pxPerCm * 2.2;
export const blackKeyWidth = pxPerCm * 1.5;
export const whiteKeyHeight = pxPerCm * 14.8;
export const blackKeyHeight = pxPerCm * 9.8;

export const previewHeight = videoHeight - whiteKeyHeight;

// Length of the preview interval in seconds
export const previewDuration = 2.5;

// How long to pause between key strokes in seconds
export const strokeInterval = 0.15;

// Minimum height required for preview bar to be labeled with note name
export const minLabelPreviewHeight = 25;

// Colors for preview bars and keys
export const keyColors = [
  "#8dd3c7",
  "#fca27b",
  "#80b1d3",
  "#fccde5",
  "#b2df8a",
  "#cab2d6",
  "#b2df8a",
  "#a6cee3",
  "#fdbf6f",
  "#cab2d6",
];

export const blackKeyColors = keyColors.map((c) => addToColor(c, -32));
export const blackKeyShadowColors = keyColors.map((c) => addToColor(c, -64));
export const blackKeyDarkShadowColors = keyColors.map((c) =>
  addToColor(c, -96)
);

// Watermark
export const watermark = staticFile(`/img/watermark.svg`);

// Active animation
export const aaFramesPerLoop = 15;

// Length of intro and intro transition
export const introFrames = fps * 8.0; // duration until strack starts
export const introTransitionFrames = fps * 4.0; // lift white veil and wait for track
export const introWaitFrames = fps * 2.0; // wait for track
export const pureIntroFrames = introFrames - introTransitionFrames;

// Length of fade out screen
export const outroFrames = fps * 3;
export const outroTransitionFrames = fps * 2;
export const pureOutroFrames = outroFrames - outroTransitionFrames;

// Map midi index to piano key index
export const midiIdxOffset = -21;
