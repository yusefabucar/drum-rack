import React from "react";
import { Button, Grid } from "@material-ui/core";

interface RecordingControlsProps {
  currentTrack: number;
  isRecording: boolean;
  handleTrackSelect: (track: number) => void;
  handleRecordingClicked: () => void;
}

const RecordingControls = ({
  currentTrack,
  isRecording,
  handleTrackSelect,
  handleRecordingClicked,
}: RecordingControlsProps) => {
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      <Grid item xs={1}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleTrackSelect(1);
          }}
        >
          1
        </Button>
      </Grid>
      <Grid item xs={1}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleTrackSelect(2);
          }}
        >
          2
        </Button>
      </Grid>
      <Grid item xs={1}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleTrackSelect(3);
          }}
        >
          3
        </Button>
      </Grid>
      <Grid item xs={1}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleTrackSelect(4);
          }}
        >
          4
        </Button>
      </Grid>
      <Grid item xs={1}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleTrackSelect(0);
          }}
        >
          None
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            handleRecordingClicked();
          }}
        >
          {isRecording ? "STOP (Q)" : "START (Q)"}
        </Button>
      </Grid>
      <Grid item xs={2}>
        {`Track: ${currentTrack}`}
      </Grid>
    </Grid>
  );
};

export default RecordingControls;
