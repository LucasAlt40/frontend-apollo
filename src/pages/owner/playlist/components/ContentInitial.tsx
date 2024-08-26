import { Edit } from "react-feather";
import DrawerGenres from "../../../../components/DrawerGenres/DrawerGenres";
import { PlaylistType } from "../../@types/PlaylistType";
import { setPlaylistInitialGenres } from "../../../../api/services/EstablishmentService";
import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";

type Props = {
  playlist: PlaylistType;
  establishmentId: string;
};

const ContentInitial = ({ playlist, establishmentId }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [genres, setGenres] = useState<string[]>([]);

  const onSetInitial = () => {
    setPlaylistInitialGenres(genres);
  };
  return (
    <>
      <div className="flex flex-wrap gap-2">
        {playlist.initialGenres?.length > 0 &&
          playlist.initialGenres.map((genre) => (
            <div
              key={genre}
              className="w-fit flex items-center gap-2 bg-white px-4 py-2 rounded-lg"
            >
              <p>{genre}</p>
            </div>
          ))}
        <button className="p-4 hover:text-primary" onClick={onOpen}>
          <Edit size={16} />
        </button>
      </div>

      <DrawerGenres
        establishmentId={establishmentId}
        isOpen={isOpen}
        onClose={onClose}
        setGenres={setGenres}
        handleSubmit={onSetInitial}
        preSelectedGenres={playlist.initialGenres}
      />
    </>
  );
};

export default ContentInitial;
