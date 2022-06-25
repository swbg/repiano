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
export const secondsPerBeat = 0.5;
export const ticksPerBeat = 480;

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

// Length of the preview interval
export const previewHeight = videoHeight - whiteKeyHeight;
export const previewDuration = 16;

// How long to pause between key strokes
export const strokeInterval = 0.25;

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

// Active animation
export const aaFramesPerLoop = 15;

// Move to score
export const barLength = 8;
export const speedMultiplier = 128;

// Length of fade out screen (keep same for different multipliers)
export const fadeOutDuration = (32 * 128) / speedMultiplier;

// Length of intro and intro transition
export const introFrames = fps * 4.5;
export const introTransitionFrames = fps * 1.5;
export const pureIntroFrames = introFrames - introTransitionFrames;
export const introBreakMultiplier = 2;

// Length of fade out screen
export const outroFrames = fps * 3;
export const outroTransitionFrames = fps * 2;
export const pureOutroFrames = outroFrames - outroTransitionFrames;
