// src/utils/sounds.js
import { Howl } from "howler";
import bgMusicFile from "../assets/bluehaze.mp3";

export const bgMusic = new Howl({
  src: [bgMusicFile],
  loop: true,
  volume: 1,
  html5: true,
});
