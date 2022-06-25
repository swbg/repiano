import audio from "./audios/route01.wav";
import { Score } from "./types";

const songTitle = "Route 1";
const score = require("./scores/route01.json") as Score;
export { songTitle, score, audio };
