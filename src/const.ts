const substractFromColor = (color: string, sub: number) => {
  return (
    "#" +
    [color.substr(1, 2), color.substr(3, 2), color.substr(5, 2)]
      .map((v) => Math.max(0, parseInt(v, 16) - sub))
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
export const previewDuration = 4;

// How long to pause between key strokes in seconds
export const strokeInterval = 0.15;

// Minimum height required for preview bar to be labeled with note name
export const minLabelPreviewHeight = 25;

// Colors for preview bars and keys
export const barColors = ["#b2df8a", "#a6cee3", "#fdbf6f", "#cab2d6"];
export const keyColors = ["#b2df8a", "#a6cee3", "#fdbf6f", "#cab2d6"];

export const blackKeyColors = keyColors.map((c) => substractFromColor(c, 32));
export const blackKeyShadowColors = keyColors.map((c) =>
  substractFromColor(c, 64)
);
export const blackKeyDarkShadowColors = keyColors.map((c) =>
  substractFromColor(c, 96)
);

// Watermark
export const watermark = "Bits and Pieces";

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
