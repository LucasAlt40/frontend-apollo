import DrawerAccount from "./components/DrawerAccount";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import apiCommonInstance from "../../../api/apiCommonInstance";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  useToast,
} from "@chakra-ui/react";
import { CardEstablishment } from "./components/CardEstablishment";
import { EstablishmentType } from "../@types/EstablishmentType";
import { Plus } from "react-feather";
import CardPlaylist from "./components/CardPlaylist";
import DrawerAlertLinkThirdParty from "./components/DrawerAlertLinkThirdParty";
import { OwnerType } from "../../../@types/OwnerType";

const Home = () => {
  const toast = useToast();
  const [searchParams] = useSearchParams();
  const [owner, setOwner] = useState<OwnerType>({} as OwnerType);
  const [establishment, setEstablishment] = useState<EstablishmentType>(
    {} as EstablishmentType
  );

  const [isOpenDrawerAlert, setIsOpenDrawerAlert] = useState(true);

  // When owner tries to link with Spotify
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
      {!owner.hasThirdPartyAccess && (
        <div className="mb-5">
          <Alert className="rounded-lg" status="warning">
            <AlertIcon />
            <AlertTitle>Atenção</AlertTitle>
            <AlertDescription>
              Sua conta não possui vinculo com spotify, você não conseguirá
              fazer uso da ferramenta.
            </AlertDescription>
          </Alert>
        </div>
      )}

      <div className="flex justify-between items-center mb-5">
        <p className="font-bold">{owner.name}</p>
        <DrawerAccount owner={owner} />
      </div>

      <div className="mb-5">
        <CardEstablishment establishment={establishment} />
      </div>

      {establishment.playlist && (
        <div className="mb-5">
          <CardPlaylist playlist={establishment.playlist} />
        </div>
      )}

      {!establishment.playlist && owner.hasThirdPartyAccess && (
        <div className="flex justify-center mb-5">
          <Button rightIcon={<Plus size={20} />} onClick={createPlaylist}>
            Criar playlist
          </Button>
        </div>
      )}

      {!owner.hasThirdPartyAccess && (
        <DrawerAlertLinkThirdParty
          isOpen={isOpenDrawerAlert}
          setIsOpen={setIsOpenDrawerAlert}
          ownerName={owner.name}
        />
      )}
    </>
  );
};

export default Home;
