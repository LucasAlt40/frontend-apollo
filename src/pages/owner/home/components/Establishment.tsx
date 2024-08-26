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
      <div className="mb-5">
        <CardEstablishment establishment={data?.data} />
      </div>

      <div className="mb-5">
        <RadioGroupDevices deviceId={data?.data.deviceId} />
      </div>

      <div className="mb-5">
        <CardPlaylist />
      </div>
    </>
  );
};

export default Establishment;
