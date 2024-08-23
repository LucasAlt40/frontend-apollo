import { useEffect, useState } from "react";
import { PlaylistType } from "../@types/PlaylistType";
import apiCommonInstance from "../../../api/apiCommonInstance";

const Playlist = () => {
  const [playlist, setPlaylist] = useState<PlaylistType>({} as PlaylistType);

  const getPlaylist = async () => {
    try {
      const response = await apiCommonInstance.get("/establishment/playlist");

      if (response.status === 200) {
        setPlaylist(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPlaylist();
  }, []);

  return (
    <div>
      <p>{playlist.id}</p>
      <p>{JSON.stringify(playlist.blockedGenres)}</p>
      <p>{JSON.stringify(playlist.genres)}</p>
      <p>{playlist.hasIncrementedGenre}</p>
    </div>
  );
};

export default Playlist;
