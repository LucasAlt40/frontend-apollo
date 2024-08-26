import { Power } from "react-feather";
import { Button } from "@chakra-ui/react";
import {
  getEstablishment,
  turnOnEstablishment,
} from "../../../../api/services/EstablishmentService";
import { useQuery } from "@tanstack/react-query";

export const CardEstablishment = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["establishment"],
    refetchOnWindowFocus: false,
    queryFn: () => getEstablishment(),
  });

  if (isLoading) return <div>Carregando...</div>;

  if (isError) return <div>Não foi possível carregar este componente.</div>;

  console.log(data?.data);

  // if (!data?.data.isOff && data?.data.playlist.hasIncrementedGenre) {
  //   return (
  //     <div className="w-full flex justify-between items-center bg-primary rounded-md p-4">
  //       <div>
  //         <p className="font-bold text-white">{data?.data.name}</p>
  //         <span className="bg-white rounded-full px-2 text-primary">
  //           Tocando agora
  //         </span>
  //       </div>
  //       <Button onClick={turnOffEstablishment}>
  //         <Power />
  //       </Button>
  //     </div>
  //   );
  // }

  if (data?.data.isOff) {
    return (
      <div className="w-full flex justify-between items-center bg-[#f1f1f1] rounded-md p-4">
        <div>
          <p className="font-bold text-primary">{data?.data.name}</p>
          <span className="bg-white rounded-full px-2 text-primary">
            Desligado
          </span>
        </div>
        <Button onClick={turnOnEstablishment}>
          <Power />
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-between items-center bg-[#f1f1f1] rounded-md p-4">
      <div>
        <p className="font-bold text-primary">{data?.data.name}</p>
        <span className="bg-[#D9D9D9] rounded-full px-2 text-primary">
          Não configurado
        </span>
      </div>
      <Button variant="ghost" disabled>
        <Power color="#e11d48" />
      </Button>
    </div>
  );
};
