import { staticFile } from "remotion";

const songTitles = {
  pallet_town: "Pallet Town",
  route_01: "Route 1",
  viridian_city: "Viridian City",
  route_03: "Route 3",
  cerulean_city: "Cerulean City",
};

export const songId = "cerulean_city";
export const songTitle = songTitles[songId];
export const midiSrc = staticFile(`/midi/${songId}.midi`);
export const audioSrc = staticFile(`/audio/${songId}.wav`);
