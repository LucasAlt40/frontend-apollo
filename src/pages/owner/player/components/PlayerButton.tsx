import { useState } from "react";
import { Pause, Play } from "react-feather";
import {
  PausePlayer,
  ResumePlayer,
} from "../../../../api/services/EstablishmentService";

const PlayerButton = () => {
  const [play, setPlay] = useState(false);

  const pause = PausePlayer();
  const resume = ResumePlayer();

  const playResumeMusic = () => {
    if (!play) {
      setPlay((prevState) => !prevState);

      pause.mutate();
    }

    if (play) {
      setPlay((prevState) => !prevState);
      resume.mutate();
    }
  };

  return (
    <div onClick={playResumeMusic}>
      {!play && <Play />} {play && <Pause />}
    </div>
  );
};

export default PlayerButton;
