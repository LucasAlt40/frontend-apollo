import { useState } from "react";
import {
  setBlockGenres,
  unBlockGenres,
} from "../../../../api/services/EstablishmentService";
import { PlaylistType } from "../../@types/PlaylistType";
import { useDisclosure } from "@chakra-ui/react";
import DrawerGenres from "../../../../components/DrawerGenres/DrawerGenres";
import { PlusCircle, Trash } from "react-feather";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  playlist: PlaylistType;
  establishmentId: string;
};

const ContentBlock = ({ playlist, establishmentId }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [genres, setGenres] = useState<string[]>([]);

  const queryClient = useQueryClient();

  const onBlock = async () => {
    await setBlockGenres(genres);
    queryClient.invalidateQueries({ queryKey: ["playlist"] });
    onClose();
  };

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {playlist.blockedGenres?.length > 0 &&
          playlist.blockedGenres.map((genre) => (
            <div
              key={genre}
              className="w-fit flex items-center gap-2 bg-white px-4 py-2 rounded-lg"
            >
              <p>{genre}</p>
              <button onClick={() => unBlockGenres([genre])}>
                <Trash color="var(--color-rose)" size={18} />
              </button>
            </div>
          ))}
        <button className="p-4 hover:text-primary" onClick={onOpen}>
          <PlusCircle size={18} />
        </button>
      </div>
      <DrawerGenres
        establishmentId={establishmentId}
        isOpen={isOpen}
        onClose={onClose}
        setGenres={setGenres}
        handleSubmit={onBlock}
      />
    </>
  );
};

export default ContentBlock;
