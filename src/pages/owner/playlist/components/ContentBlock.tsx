import { useState } from "react";
import { SetBlockGenres } from "../../../../api/services/EstablishmentService";
import { PlaylistType } from "../../@types/PlaylistType";
import { useDisclosure } from "@chakra-ui/react";
import DrawerGenres from "../../../../components/DrawerGenres/DrawerGenres";
import { PlusCircle } from "react-feather";
import TagBlockedGenre from "./TagBlockedGenre";

type Props = {
  playlist: PlaylistType;
  establishmentId: string;
};

const ContentBlock = ({ playlist, establishmentId }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [genres, setGenres] = useState<string[]>([]);

  const { mutate } = SetBlockGenres(onClose);

  const onBlock = async () => {
    mutate(genres);
  };

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {playlist.blockedGenres?.length > 0 &&
          playlist.blockedGenres.map((genre) => (
            <TagBlockedGenre key={genre} genre={genre} />
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
