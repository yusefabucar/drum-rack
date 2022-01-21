import React, { useState } from "react";
import { compareTracks, Track } from "../utils/types";
import { Button, FormControlLabel, Grid, Switch } from "@material-ui/core";
import { playSound } from "../utils/soundPlaying";

interface PlayPanelProps {
  track1: Track;
  track2: Track;
  track3: Track;
  track4: Track;
}

const PlayPanel = ({ track1, track2, track3, track4 }: PlayPanelProps) => {
  const [state, setState] = useState({
    a: false,
    b: false,
    c: false,
    d: false,
  });

  const handleChange =
    (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setState({ ...state, [name]: event.target.checked });
    };

  const recursivePlay = (
    track: Track,
    index: number,
    cumulativeTime: number
  ) => {
    if (track.length <= index) {
      return;
    }
    const record = track[index];
    const timeToNextTrack = record.time - cumulativeTime;
    playSound(record.sound);
    setTimeout(() => {
      recursivePlay(track, index + 1, cumulativeTime + timeToNextTrack);
    }, timeToNextTrack);
  };

  const handlePlay = () => {
    let playTrack: Track = [];
    playTrack = state.a ? [...playTrack, ...track1] : playTrack;
    playTrack = state.b ? [...playTrack, ...track2] : playTrack;
    playTrack = state.c ? [...playTrack, ...track3] : playTrack;
    playTrack = state.d ? [...playTrack, ...track4] : playTrack;
    playTrack.sort(compareTracks);
    if (playTrack.length === 0) return;
    setTimeout(() => {
      recursivePlay(playTrack, 0, 0);
    }, playTrack[0].time);
  };

  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="center"
      spacing={2}
    >
      <Grid item xs>
        <FormControlLabel
          control={
            <Switch
              checked={state.a}
              onChange={handleChange("a")}
              value="1"
              color="primary"
            />
          }
          label="Track 1"
        />
      </Grid>
      <Grid item xs>
        <FormControlLabel
          control={
            <Switch
              checked={state.b}
              onChange={handleChange("b")}
              value="2"
              color="primary"
            />
          }
          label="Track 2"
        />
      </Grid>
      <Grid item xs>
        <FormControlLabel
          control={
            <Switch
              checked={state.c}
              onChange={handleChange("c")}
              value="3"
              color="primary"
            />
          }
          label="Track 3"
        />
      </Grid>
      <Grid item xs>
        <FormControlLabel
          control={
            <Switch
              checked={state.d}
              onChange={handleChange("d")}
              value="4"
              color="primary"
            />
          }
          label="Track 4"
        />
      </Grid>
      <Grid item xs>
        <Button variant="contained" color="primary" onClick={handlePlay}>
          Play
        </Button>
      </Grid>
    </Grid>
  );
};

export default PlayPanel;
