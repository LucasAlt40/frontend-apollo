import { useState } from "react";
import {
  setBlockGenres,
  unBlockGenres,
} from "../../../../api/services/EstablishmentService";
import { PlaylistType } from "../../@types/PlaylistType";
import { useDisclosure } from "@chakra-ui/react";
import DrawerGenres from "../../../../components/DrawerGenres/DrawerGenres";
import { PlusCircle, Trash } from "react-feather";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

type Props = {
  playlist: PlaylistType;
  establishmentId: string;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<AxiosResponse<any, any>, Error>>;
};

const ContentBlock = ({ playlist, establishmentId, refetch }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [genres, setGenres] = useState<string[]>([]);

  const onBlock = async () => {
    await setBlockGenres(genres);
    refetch();
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
