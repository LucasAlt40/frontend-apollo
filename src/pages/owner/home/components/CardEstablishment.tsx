import { Power } from "react-feather";
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
    const { mutate } = TurnOffEstablishment();
    return (
      <div className="w-full flex justify-between items-center bg-primary rounded-lg p-4">
        <div className="flex gap-2">
          <span className="bg-white font-bold w-12 h-12 rounded-full flex justify-center items-center">
            {establishment.name.charAt(0)}
          </span>
          <div>
            <p className="font-bold text-white">{establishment.name}</p>
            <span className="bg-white rounded-full px-2 text-primary text-sm">
              Tocando agora
            </span>
          </div>
        </div>
        <button onClick={() => mutate()}>
          <Power color="white" />
        </button>
      </div>
    );
  }

  if (establishment.isOff && establishment.playlist !== null) {
    const { mutate } = TurnOnEstablishment();
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
        <button onClick={() => mutate()}>
          <Power color="var(--color-rose)" />
        </button>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-between items-center bg-[#f1f1f1] rounded-lg p-4">
      <div className="flex gap-2">
        <span className="bg-white font-bold w-12 h-12 rounded-full flex justify-center items-center">
          {establishment.name.charAt(0)}
        </span>
        <div>
          <p className="font-bold text-primary">{establishment.name}</p>
          <span className="bg-[#d9d9d9] rounded-full px-2 text-primary text-sm">
            Não configurado
          </span>
        </div>
      </div>
      <button disabled>
        <Power color="#d9d9d9" />
      </button>
    </div>
  );
};
