import { blackKeyWidth, nWhiteKeys, videoWidth, whiteKeyWidth } from "./const";
import { Score } from "./types";

export const isBlackKey = (keyIdx: number) => {
  const modIdx = (9 + keyIdx) % 12;
  if ([1, 3, 6, 8, 10].indexOf(modIdx) < 0) {
    return false;
  }
  return true;
};

export const getPreviousWhiteKeyIdx = (keyIdx: number) => {
  const nAis = Math.floor((keyIdx + 11) / 12);
  const nCis = Math.floor((keyIdx + 8) / 12);
  const nDis = Math.floor((keyIdx + 6) / 12);
  const nFis = Math.floor((keyIdx + 3) / 12);
  const nGis = Math.floor((keyIdx + 1) / 12);

  return keyIdx - nAis - nCis - nDis - nFis - nGis;
};

export const getBaseNote = (keyIdx: number) => {
  switch (keyIdx % 12) {
    case 0:
      return "A";
    case 2:
      return "B";
    case 3:
      return "C";
    case 5:
      return "D";
    case 7:
      return "E";
    case 8:
      return "F";
    case 10:
      return "G";
    default:
      return "";
  }
};

export const getCNote = (keyIdx: number) => {
  if ((keyIdx + 9) % 12 == 0) {
    return `C${Math.floor((keyIdx + 9) / 12)}`;
  }
  return "";
};

export const isShiftedLeft = (keyIdx: number) => {
  // cis, fis
  return (keyIdx + 8) % 12 == 0 || (keyIdx + 3) % 12 == 0;
};

export const isShiftedRight = (keyIdx: number) => {
  // ais, dis
  return (keyIdx + 11) % 12 == 0 || (keyIdx + 6) % 12 == 0;
};

export const getKeyPosition = (keyIdx: number) => {
  const previousWhiteKeyIdx = getPreviousWhiteKeyIdx(keyIdx);
  let positionX = previousWhiteKeyIdx * whiteKeyWidth;
  if (isBlackKey(keyIdx)) {
    positionX += whiteKeyWidth - blackKeyWidth / 2;

    if (isShiftedLeft(keyIdx)) {
      positionX -= blackKeyWidth / 8;
    } else if (isShiftedRight(keyIdx)) {
      positionX += blackKeyWidth / 8;
    }
  }
  // Shift according to screen width
  positionX -= (nWhiteKeys * whiteKeyWidth - videoWidth) / 2;
  return positionX;
};

export const getTotalDuration = (score: Score) => {
  return score.reduce((acc, voice) => {
    const voiceDuration = voice.reduce((acc, note) => acc + note[1], 0);
    return acc > voiceDuration ? acc : voiceDuration;
  }, 0);
};
