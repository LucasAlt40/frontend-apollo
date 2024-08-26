import { useQuery } from "@tanstack/react-query";
import {
  createEstablishmentPlaylist,
  getEstablishmentPlaylist,
} from "../../../../api/services/EstablishmentService";
import { Plus, Settings } from "react-feather";
import defaultImage from "../../../../assets/images/default.jpg";
import { Button } from "@chakra-ui/react";

const CardPlaylist = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["establishmentPlaylist"],
    refetchOnWindowFocus: false,
    queryFn: () => getEstablishmentPlaylist(),
  });

  if (isLoading) return <div>Carregando...</div>;

  if (isError) return <div>Não foi possível carregar este componente.</div>;

  console.log(data?.data);

  if (data?.data === "") {
    return (
      <div className="w-full flex justify-center bg-[#f1f1f1] rounded-lg p-4">
        <Button
          colorScheme="red"
          rightIcon={<Plus size={20} />}
          onClick={createEstablishmentPlaylist}
        >
          Criar playlist
        </Button>
      </div>
    );
  }

  return (
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
