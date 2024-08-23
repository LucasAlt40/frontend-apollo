import { PlaylistType } from "../../@types/PlaylistType";
import { Settings } from "react-feather";
import defaultImage from "../../../../assets/images/default.jpg";

type Props = {
  playlist: PlaylistType;
};

const CardPlaylist = ({ playlist }: Props) => {
  return (
    <div className="w-full bg-[#f1f1f1] rounded-lg p-4">
      <img
        className="rounded-lg"
        src={playlist.images !== null ? playlist.images[0].url : defaultImage}
        alt="Imagem da Playlist"
      />
      <div className="my-5">
        <div>
          <span className="text-sm text-muted">Nome da playlist</span>
          <p className="text-2xl font-bold">{playlist.name}</p>
        </div>
        <p className="font-bold">{playlist.description}</p>
      </div>
      <div className="w-full flex justify-end">
        <a
          className="flex items-center gap-2 bg-white px-3 py-1 rounded-md"
          href="/owner/playlist"
        >
          <span className="font-medium">Configurar</span>
          <Settings size={18} />
        </a>
      </div>
    </div>
  );
};

export default CardPlaylist;
