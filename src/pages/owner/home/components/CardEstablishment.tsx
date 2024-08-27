import { Power } from "react-feather";
import { Button } from "@chakra-ui/react";
import {
  TurnOffEstablishment,
  TurnOnEstablishment,
} from "../../../../api/services/EstablishmentService";
import { EstablishmentType } from "../../@types/EstablishmentType";

type Props = {
  establishment: EstablishmentType;
};

export const CardEstablishment = ({ establishment }: Props) => {
  if (!establishment.isOff && establishment.playlist.hasIncrementedGenre) {
    return (
      <div className="w-full flex justify-between items-center bg-primary rounded-lg p-4">
        <div>
          <p className="font-bold text-white">{establishment.name}</p>
          <span className="bg-white rounded-full px-2 text-primary">
            Tocando agora
          </span>
        </div>
        <Button onClick={TurnOffEstablishment}>
          <Power />
        </Button>
      </div>
    );
  }

  if (establishment.isOff && establishment.playlist !== null) {
    return (
      <div className="w-full flex justify-between items-center bg-[#f1f1f1] rounded-lg p-4">
        <div className="flex gap-2">
          <span className="bg-white font-bold w-12 h-12 rounded-full flex justify-center items-center">
            {establishment.name.charAt(0)}
          </span>
          <div>
            <p className="font-bold text-primary">{establishment.name}</p>
            <span className="bg-white rounded-full px-2 text-primary text-sm">
              Desligado
            </span>
          </div>
        </div>
        <Button
          variant="outline"
          colorScheme="red"
          onClick={TurnOnEstablishment}
        >
          <Power size={20} />
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-between items-center bg-[#f1f1f1] rounded-lg p-4">
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
