import { useState } from "react";
import defaultImage from "../../../assets/images/default.jpg";
import SimpleCard from "../../../components/SimpleCard/SimpleCard";
import { getPlaylist } from "../../../api/services/EstablishmentService";
import { useQuery } from "@tanstack/react-query";
import { OwnerType } from "../../../@types/OwnerType";
import { getDecodedAccessToken, mapTokenToOwner } from "../../../utils";
import ContentBlock from "./components/ContentBlock";
import ContentInitial from "./components/ContentInitial";

const Playlist = () => {
  const [owner] = useState<OwnerType>(mapTokenToOwner(getDecodedAccessToken()));
  const { isLoading, error, data } = useQuery({
    queryKey: ["playlist"],
    refetchOnWindowFocus: false,
    queryFn: () => getPlaylist(),
  });

  if (isLoading) return <div>Carregando...</div>;

  if (error) return <div>Não foi pssível carregar este componente.</div>;

  return (
    <>
      <div className="w-full bg-[#f1f1f1] rounded-lg p-4 mb-5">
        <img
          className="rounded-lg"
          src={defaultImage}
          alt="Imagem da Playlist"
        />
        <div className="my-5">
          <p className="text-2xl font-bold">{data?.data.name}</p>
          <p>{data?.data.description}</p>
        </div>
      </div>

      <SimpleCard
        title="Gêneros bloqueados"
        description="Bloqueie gêneros para evitar musicas indesejadas."
      >
        <ContentBlock
          playlist={data?.data}
          establishmentId={owner.establishmentId}
        />
      </SimpleCard>

      <SimpleCard
        title="Gêneros da playlist"
        description="Defina seu gosto, escolha até 3 gêneros para iniciar a playlist"
      >
        <ContentInitial
          playlist={data?.data}
          establishmentId={owner.establishmentId}
        />
      </SimpleCard>
    </>
  );
};

export default Playlist;
