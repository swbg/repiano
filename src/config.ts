import { staticFile } from "remotion";

export const songTitle = "Route 1";
export const songId = "route_01";
export const midiSrc = staticFile(`/midi/${songId}.midi`);
export const audioSrc = staticFile(`/audio/${songId}.wav`);
