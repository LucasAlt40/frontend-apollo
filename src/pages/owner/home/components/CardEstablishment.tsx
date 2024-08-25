import { Power } from "react-feather";
import { Button, useToast } from "@chakra-ui/react";
import { EstablishmentType } from "../../@types/EstablishmentType";
import apiCommonInstance from "../../../../api/config/apiCommonInstance";

type Props = {
  establishment: EstablishmentType;
};

export const CardEstablishment = ({ establishment }: Props) => {
  const toast = useToast();

  const turnOnEstablishment = async () => {
    try {
      const response = await apiCommonInstance.post("/establishment/turn-on");

      if (response.status === 200) {
        toast({
          position: "top",
          title: "Estabelecimento ligado com sucesso!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      if (response.status === 204) {
        toast({
          position: "top",
          title: "Opa! Atenção",
          description:
            "Ocorreu um erro ao ligar estabelecimento, crie uma playlist antes de inicia-lo.",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
    } catch {
      toast({
        position: "top",
        title: "Opa! Parece que algo deu errado.",
        description: "Ocorreu um problema ao ligar o estabelecimento",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const turnOffEstablishment = async () => {
    try {
      const response = await apiCommonInstance.post("/establishment/turn-off");

      if (response.status === 200) {
        toast({
          position: "top",
          title: "Estabelecimento desligado com sucesso!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      if (response.status === 406) {
        toast({
          position: "top",
          title: "Opa! Parece que algo deu errado.",
          description: "O ambiente já está desligado",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
    } catch {
      toast({
        position: "top",
        title: "Opa! Parece que algo deu errado.",
        description: "Ocorreu um problema ao desligar o estabelecimento",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (!establishment?.isOff && establishment?.playlist?.hasIncrementedGenre) {
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

  if (establishment?.isOff) {
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
