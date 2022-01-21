import React from "react";
import { Track } from "../utils/types";
import TrackRecording from "./TrackRecording";

interface TrackRecordingPanelProps {
  track1: Track;
  track2: Track;
  track3: Track;
  track4: Track;
}

const TrackRecordingPanel = ({
  track1,
  track2,
  track3,
  track4,
}: TrackRecordingPanelProps) => {
  return (
    <>
      <TrackRecording trackNumber={1} track={track1} />
      <TrackRecording trackNumber={2} track={track2} />
      <TrackRecording trackNumber={3} track={track3} />
      <TrackRecording trackNumber={4} track={track4} />
    </>
  );
};

export default TrackRecordingPanel;
