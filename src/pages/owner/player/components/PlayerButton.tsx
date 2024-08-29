import { useEffect, useState } from "react";
import { Pause, Play } from "react-feather";
import {
  PausePlayer,
  ResumePlayer,
} from "../../../../api/services/EstablishmentService";

const PlayerButton = ({
  isPlaying,
  size,
}: {
  isPlaying: boolean;
  size?: number;
}) => {
  const [play, setPlay] = useState(isPlaying);

  const pause = PausePlayer();
  const resume = ResumePlayer();

  useEffect(() => {
    setPlay(isPlaying);
  }, [isPlaying]);

  const playResumeMusic = () => {
    if (play) {
      setPlay(false);
      pause.mutate();
    } else {
      setPlay(true);
      resume.mutate();
    }
  };

  return (
    <div onClick={playResumeMusic}>
      {play ? (
        <Pause size={size} color="white" />
      ) : (
        <Play color="white" size={size} />
      )}
    </div>
  );
};

export default PlayerButton;
