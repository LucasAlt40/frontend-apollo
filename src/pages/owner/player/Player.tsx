import { Button } from "@chakra-ui/react";
import {
  GetPlayerState,
  NextMusic,
  PreviousMusic,
} from "../../../api/services/EstablishmentService";
import PlayerButton from "./components/PlayerButton";

const Player = () => {
  const { data } = GetPlayerState();
  const next = NextMusic();
  const previous = PreviousMusic();

  return (
    <div className="w-full h-full flex flex-col p-4 items-center  bg-gradient-to-b from-primary via-mediumRose to-darkRose">
      <div>
        <img
          className="rounded-md"
          src={data?.data.item.album.images[1].url}
          alt="Imagem música"
        />
        <h1 className="text-white text-lg text-center m-2">
          {data?.data.item.name}
        </h1>
        <p className="text-slate-400 text-center">
          {data?.data.item.artists.map((artist: any, index: number) => {
            if (index == data.data.item.artists.length - 1) {
              return artist.name;
            }
            return `${artist.name}, `;
          })}
        </p>
      </div>
      <div className="w-full flex justify-center gap-4">
        <Button onClick={() => previous.mutate()}>volta</Button>
        <PlayerButton />
        <Button onClick={() => next.mutate()}>vai</Button>
      </div>
    </div>
  );
};

export default Player;
