import React from "react";
import { SoundRecord, Track } from "../utils/types";
import { Button, Grid } from "@material-ui/core";

interface TrackRecordingProps {
  track: Track;
  trackNumber: number;
}

const TrackRecording = ({ trackNumber, track }: TrackRecordingProps) => {
  const sounds = track.map((sr: SoundRecord) => {
    return (
      <Grid item xs key={`${trackNumber}-${sr.time}-${sr.sound}`}>
        <Button variant="outlined" disabled>
          {sr.time < 1000000
            ? `${sr.sound} (${(sr.time / 1000).toFixed(2)}s)`
            : `${sr.sound}`}
        </Button>
      </Grid>
    );
  });

  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="center"
      spacing={2}
    >
      <Grid item xs>
        <Button>Track {trackNumber}</Button>
      </Grid>
      {sounds}
    </Grid>
  );
};

export default TrackRecording;
