import React from "react";
import { Button, Grid } from "@material-ui/core";
import { playSound, Sounds } from "../utils/soundPlaying";

interface SoundKeyboardProps {
  handleKeyClick: (sound: Sounds) => void;
}

const SoundMap: { [key in Sounds]: string } = {
  boom: "A",
  clap: "S",
  hihat: "D",
  kick: "F",
  openhat: "G",
  ride: "H",
  snare: "J",
  tink: "K",
  tom: "L",
};

const SoundKeyboard = ({ handleKeyClick }: SoundKeyboardProps) => {
  // @ts-ignore
  const buttons = Object.keys(Sounds).map((soundName: Sounds) => {
    return (
      <Grid item xs key={soundName}>
        <Button
          variant="contained"
          onClick={() => {
            playSound(soundName);
            handleKeyClick(soundName);
          }}
        >
          {`${soundName} (${SoundMap[soundName]})`}
        </Button>
      </Grid>
    );
  });

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      {buttons}
    </Grid>
  );
};

export default SoundKeyboard;
