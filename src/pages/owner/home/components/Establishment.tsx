import { useQuery } from "@tanstack/react-query";
import RadioGroupDevices from "./RadioGroupDevices";
import { CardEstablishment } from "./CardEstablishment";
import CardPlaylist from "./CardPlaylist";
import { getEstablishment } from "../../../../api/services/EstablishmentService";

const Establishment = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["establishment"],
    refetchOnWindowFocus: false,
    queryFn: () => getEstablishment(),
  });

  if (isLoading) return <div>Carregando...</div>;

  if (isError) return <div>Não foi possível carregar este componente.</div>;

  return (
    <>
      <span className="text-muted font-medium">Ambiente</span>
      <div className="mb-5">
        <CardEstablishment establishment={data?.data} />
      </div>

      <span className="text-muted font-medium">Dispositivos disponíveis</span>
      <div className="mb-5 border p-4 rounded-lg">
        <RadioGroupDevices deviceId={data?.data.deviceId} />
      </div>

      <span className="text-muted font-medium">Playlist</span>
      <div className="mb-5">
        <CardPlaylist />
      </div>
    </>
  );
};

export default Establishment;
