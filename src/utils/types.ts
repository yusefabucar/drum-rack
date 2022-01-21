import { Sounds } from "./soundPlaying";

export type Track = Array<SoundRecord>;

export type SoundRecord = {
  sound: Sounds;
  time: number;
};

export const compareTracks = (a: SoundRecord, b: SoundRecord) => {
  if (a.time < b.time) {
    return -1;
  }
  if (a.time > b.time) {
    return 1;
  }
  return 0;
};
