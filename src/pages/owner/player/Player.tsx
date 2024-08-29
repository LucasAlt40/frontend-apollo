import { useEffect, useState, useRef } from "react";
import {
  GetPlayerState,
  NextMusic,
  PreviousMusic,
} from "../../../api/services/EstablishmentService";
import { ChevronLeft, ChevronRight } from "react-feather";
import PlayerButton from "./components/PlayerButton";

const Player = () => {
  const { data, refetch } = GetPlayerState();
  const next = NextMusic();
  const previous = PreviousMusic();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [_, setProgress] = useState<number>(0); //eslint-disable-line
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    if (data) {
      setIsPlaying(data.data.is_playing);
      setProgress(data.data.progress_ms);
    }
  }, [data]);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 1000;
          const duration = data?.data.item.duration_ms || 0;

          if (newProgress >= duration) {
            refetch();
            clearInterval(intervalRef.current!);
            return duration;
          }

          return newProgress;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, data, refetch]);

  useEffect(() => {
    if (data && data.data.is_playing !== isPlaying) {
      setIsPlaying(data.data.is_playing);
    }
  }, [data]); //eslint-disable-line

  return (
    <div className="w-screen h-[95.2vh] flex flex-col p-4 items-center bg-gradient-to-b from-primary via-mediumRose to-darkRose absolute top-0 left-0">
      <h1 className="text-[#CFCFCF]">Tocando agora</h1>
      <div className="mt-4 flex flex-col items-center justify-center">
        <img
          className="rounded-md"
          src={data?.data.item.album.images[1].url}
          alt="Imagem música"
        />
        <h1 className="text-white w-full text-lg text-center m-2">
          {data?.data.item.name}
        </h1>
        <p className="w-[50%] text-[#CFCFCF] text-center text-sm">
          {data?.data.item.artists.map((artist: any, index: number) =>
            index === data.data.item.artists.length - 1
              ? artist.name
              : `${artist.name}, `
          )}
        </p>
      </div>
      <div className="w-full flex justify-center gap-4 mt-4">
        <div onClick={() => previous.mutate()}>
          <ChevronLeft size={42} color="white" />
        </div>
        <PlayerButton size={42} isPlaying={isPlaying} />
        <div onClick={() => next.mutate()}>
          <ChevronRight size={42} color="white" />
        </div>
      </div>
    </div>
  );
};

export default Player;
