import { Power } from "react-feather";
import { Button } from "@chakra-ui/react";
import {
  turnOffEstablishment,
  turnOnEstablishment,
} from "../../../../api/services/EstablishmentService";
import { EstablishmentType } from "../../@types/EstablishmentType";

type Props = {
  establishment: EstablishmentType;
};

export const CardEstablishment = ({ establishment }: Props) => {
  if (!establishment.isOff && establishment.playlist.hasIncrementedGenre) {
    return (
      <div className="w-full flex justify-between items-center bg-primary rounded-md p-4">
        <div>
          <p className="font-bold text-white">{establishment.name}</p>
          <span className="bg-white rounded-full px-2 text-primary">
            Tocando agora
          </span>
        </div>
        <Button onClick={turnOffEstablishment}>
          <Power />
        </Button>
      </div>
    );
  }

  if (establishment.isOff && establishment.playlist !== null) {
    return (
      <div className="w-full flex justify-between items-center bg-[#f1f1f1] rounded-md p-4">
        <div>
          <p className="font-bold text-primary">{establishment.name}</p>
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
        <p className="font-bold text-primary">{establishment.name}</p>
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
