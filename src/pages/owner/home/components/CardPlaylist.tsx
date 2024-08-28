import {
  CreateEstablishmentPlaylist,
  GetEstablishmentPlaylist,
} from "../../../../api/services/EstablishmentService";
import { Plus, Settings } from "react-feather";
import defaultImage from "../../../../assets/images/default-playlist.jpg";
import { Button, Skeleton } from "@chakra-ui/react";

const CardPlaylist = () => {
  const { data, isLoading, isError } = GetEstablishmentPlaylist();

  const { mutate } = CreateEstablishmentPlaylist();

  if (isLoading) return <Skeleton width="100%" height="300px"></Skeleton>;

  if (isError) return <div>Não foi possível carregar este componente.</div>;

  return (
    <>
      {data?.data === "" ? (
        <div className="w-full flex justify-center bg-[#f1f1f1] rounded-lg p-4">
          <Button
            colorScheme="red"
            rightIcon={<Plus size={20} />}
            onClick={() => mutate()}
          >
            Gerar playlist
          </Button>
        </div>
      ) : (
        <div className="w-full bg-[#f1f1f1] rounded-lg p-4">
          <img
            className="rounded-lg"
            src={data?.data.images ? data?.data.images[0].url : defaultImage}
            alt="Imagem da Playlist"
          />
          <div className="my-5">
            <p className="text-2xl font-bold">{data?.data.name}</p>
            <p>{data?.data.description}</p>
          </div>
          <div className="w-full flex justify-end">
            <a
              className="px-4 py-2 flex items-center gap-2 bg-white rounded-md"
              href="/owner/playlist"
            >
              <span className="font-medium">Configurar</span>
              <Settings size={18} />
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default CardPlaylist;
