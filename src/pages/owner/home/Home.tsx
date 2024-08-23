import DrawerAccount from "./components/DrawerAccount";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import apiCommonInstance from "../../../api/apiCommonInstance";
import { Button, useToast } from "@chakra-ui/react";
import { CardEstablishment } from "./components/CardEstablishment";
import { OwnerType } from "../@types/OwnerType";
import { EstablishmentType } from "../@types/EstablishmentType";
import { Plus } from "react-feather";
import CardPlaylist from "./components/CardPlaylist";

const Home = () => {
  const toast = useToast();
  const [searchParams] = useSearchParams();
  const [owner, setOwner] = useState<OwnerType>({} as OwnerType);
  const [establishment, setEstablishment] = useState<EstablishmentType>(
    {} as EstablishmentType
  );

  // Only exist this var ff the owner tries to link with Spotify
  const code = searchParams.get("code");

  const getOwner = async () => {
    try {
      const response = await apiCommonInstance.get("/owner");

      if (response.status === 200) {
        setOwner(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getEstablishment = async () => {
    try {
      const response = await apiCommonInstance.get("/establishment");

      if (response.status === 200) {
        setEstablishment(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendAuthorizationCode = async (code: string) => {
    try {
      const response = await apiCommonInstance.post("/auth/api", {
        code: code,
      });

      if (response.status === 200) {
        toast({
          position: "top",
          title: "Conta Spotify vinculada com sucesso!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      if (response.status !== 200) {
        toast({
          position: "top",
          title: "Opa! Parece que algo deu errado.",
          description:
            "Ocorreu um problema ao vincular com o Spotify. Tente novamente.",
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
        description:
          "Ocorreu um problema ao vincular com o Spotify. Tente novamente.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const createPlaylist = async () => {
    try {
      const response = await apiCommonInstance.post("/establishment/playlist");

      if (response.status === 200) {
        toast({
          position: "top",
          title: "Playlist criada com sucesso!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      if (response.status !== 200) {
        toast({
          position: "top",
          title: "Opa! Parece que algo deu errado.",
          description:
            "Ocorreu um problema ao criar a playlist. Tente novamente.",
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
        description:
          "Ocorreu um problema ao criar a playlist. Tente novamente.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (Object.keys(owner).length && !owner.hasThirdPartyAccess) {
    if (code !== null) {
      sendAuthorizationCode(code);
    }
  }

  useEffect(() => {
    getOwner();
    getEstablishment();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <p className="font-bold">{owner.name}</p>
        <DrawerAccount owner={owner} />
      </div>

      <div className="mb-5">
        <CardEstablishment establishment={establishment} />
      </div>

      <div className="mb-5">
        {establishment.playlist ? (
          <CardPlaylist playlist={establishment.playlist} />
        ) : (
          <Button rightIcon={<Plus size={20} />} onClick={createPlaylist}>
            Criar playlist
          </Button>
        )}
      </div>
    </>
  );
};

export default Home;
