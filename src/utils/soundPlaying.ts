export enum Sounds {
  airhorn = "airhorn",
  boom = "boom",
  clap = "clap",
  hihat = "hihat",
  kick = "kick",
  openhat = "openhat",
  ride = "ride",
  snare = "snare",
  tink = "tink",
  tom = "tom",
}

export const keyMap = (key: string): Sounds => {
  switch (key) {
    case "w":
      return Sounds.airhorn;
    case "s":
      return Sounds.clap;
    case "d":
      return Sounds.hihat;
    case "f":
      return Sounds.kick;
    case "g":
      return Sounds.openhat;
    case "h":
      return Sounds.ride;
    case "j":
      return Sounds.snare;
    case "k":
      return Sounds.tink;
    case "l":
      return Sounds.tom;
    case "a":
    default:
      return Sounds.boom;
  }
};

export const playSound = (sound: Sounds) => {
  new Audio(`./music/${sound}.wav`).play();
};
