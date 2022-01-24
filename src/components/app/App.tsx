import React, { Dispatch, SetStateAction, useState } from "react";
import { SoundRecord, Track } from "../../utils/types";
import { Grid, makeStyles } from "@material-ui/core";
import SoundKeyboard from "../SoundKeyboard";
import { keyMap, playSound, Sounds } from "../../utils/soundPlaying";
import RecordingControls from "../RecordingControls";
import TrackRecordingPanel from "../TrackRecordingPanel";
import KeyboardEventHandler from "react-keyboard-event-handler";
import PlayPanel from "../PlayPanel";
import "./app-ui.css";

const useStyles = makeStyles({
  fullWidth: {
    width: "100%",
  },
});

const App: React.FC = () => {
  const classes = useStyles();
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = useState<number>(1);
  const [lastRecordedIndex, setLastRecordedIndex] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(new Date().getTime());

  const [track1, setTrack1] = useState<Track>([]);
  const [track2, setTrack2] = useState<Track>([]);
  const [track3, setTrack3] = useState<Track>([]);
  const [track4, setTrack4] = useState<Track>([]);

  const startRecording = () => {
    setIsRecording(true);
    setStartTime(new Date().getTime());
    setLastRecordedIndex(getTrack(currentTrack).length);
  };

  // 0,500, 1000
  const stopRecording = () => {
    const track = getTrack(currentTrack);
    const lastTimeInTrack = track[lastRecordedIndex - 1]
      ? track[lastRecordedIndex - 1].time
      : 0;

    const tempTrack: Track = getTrack(currentTrack).map(
      (record, index): SoundRecord => {
        if (index < lastRecordedIndex) {
          return record;
        } else {
          return {
            sound: record.sound,
            time: lastTimeInTrack + (record.time - startTime),
          };
        }
      }
    );
    getSetTrack(currentTrack)(tempTrack);
    setIsRecording(false);
  };

  const getTrack = (track: number): Array<SoundRecord> => {
    switch (track) {
      case 1:
        return track1;
      case 2:
        return track2;
      case 3:
        return track3;
      case 4:
      default:
        return track4;
    }
  };

  const getSetTrack = (track: number): Dispatch<SetStateAction<Track>> => {
    switch (track) {
      case 1:
        return setTrack1;
      case 2:
        return setTrack2;
      case 3:
        return setTrack3;
      case 4:
      default:
        return setTrack4;
    }
  };

  const appendTrack = (sound: Sounds) => {
    const record = {
      sound: sound,
      time: new Date().getTime(),
    };
    getSetTrack(currentTrack)([...getTrack(currentTrack), record]);
  };

  const switchTrack = (trackNumber: number) => {
    if (isRecording) {
      stopRecording();
    }
    setCurrentTrack(trackNumber);
  };

  const handleRecordingClicked = () => {
    currentTrack !== 0 && (!isRecording ? startRecording() : stopRecording());
  };

  const handleKeyClick = (sound: Sounds) => {
    if (!isRecording) return;
    appendTrack(sound);
  };

  return (
    <section className="daw-ui">
      <div className="instruc">
        <h2>Instructions</h2>

        <p className="inst">
          To use the drum module, press the corresponding keys on your keyboard
          to activate each sound. To record, first select the track layer i.e. 1
          through 4, or use none for freeplay. After selecting track number,
          press the red start button or press Q to start recording. Play your
          notes, and then press Q again to stop recording. Your notes have now
          been recorded and can be played back by activating the track number at
          the bottom and pressing 'play'. Up to four tracks can be layered and
          played simultaneously!
        </p>
        <h6>CurrentKit:Trap</h6>
      </div>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs className={classes.fullWidth}>
          <RecordingControls
            isRecording={isRecording}
            currentTrack={currentTrack}
            handleTrackSelect={switchTrack}
            handleRecordingClicked={handleRecordingClicked}
          />
        </Grid>
        <Grid item xs className={classes.fullWidth}>
          <SoundKeyboard handleKeyClick={handleKeyClick} />
        </Grid>
        <Grid item xs className={classes.fullWidth}>
          <TrackRecordingPanel
            track1={track1}
            track2={track2}
            track3={track3}
            track4={track4}
          />
        </Grid>
        <Grid item xs className={classes.fullWidth}>
          <PlayPanel
            track1={track1}
            track2={track2}
            track3={track3}
            track4={track4}
          />
        </Grid>
        <KeyboardEventHandler
          handleKeys={[
            "a",
            "s",
            "d",
            "f",
            "g",
            "h",
            "j",
            "k",
            "l",
            "q",
            "1",
            "2",
            "3",
            "4",
          ]}
          handleFocusableElements={true}
          onKeyEvent={(key: string) => {
            switch (key) {
              case "q":
                handleRecordingClicked();
                break;
              case "1":
              case "2":
              case "3":
              case "4":
                switchTrack(Number(key));
                break;
              default:
                playSound(keyMap(key));
                handleKeyClick(keyMap(key));
            }
          }}
        />
      </Grid>
    </section>
  );
};

export default App;
