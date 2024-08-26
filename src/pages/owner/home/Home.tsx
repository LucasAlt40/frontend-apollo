import DrawerAccount from "./components/DrawerAccount";
import { useSearchParams } from "react-router-dom";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  useDisclosure,
} from "@chakra-ui/react";
import { CardEstablishment } from "./components/CardEstablishment";
import CardPlaylist from "./components/CardPlaylist";
import DrawerAlertLinkThirdParty from "./components/DrawerAlertLinkThirdParty";
import CardDevices from "./components/CardDevices";
import { useQuery } from "@tanstack/react-query";
import { getOwner } from "../../../api/services/OwnerService";
import { sendAuthorizationCode } from "../../../api/services/AuthService";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { isPending, error, data } = useQuery({
    queryKey: ["owner"],
    refetchOnWindowFocus: false,
    queryFn: () => getOwner(),
  });

  if (!isPending && !error) {
    if (!data?.data.hasThirdPartyAccess) {
      // When owner tries to link with Spotify
      const code = searchParams.get("code");

      if (code !== null) {
        sendAuthorizationCode(code);
        searchParams.delete("code");
        setSearchParams(searchParams);
      }
    }
  }

  console.log(data?.data);

  return (
    <>
      {!data?.data.hasThirdPartyAccess && (
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
        {isPending && <div>Carregando...</div>}
        {!isPending && !error && (
          <>
            <p className="font-bold">{data?.data.name}</p>
            <DrawerAccount owner={data?.data} />
          </>
        )}
      </div>

      <div className="mb-5">
        <CardEstablishment />
      </div>

      {data?.data.hasThirdPartyAccess && (
        <>
          <div className="mb-5">
            <CardDevices />
          </div>

          <div className="mb-5">
            <CardPlaylist />
          </div>
        </>
      )}

      {!isPending && !error && !data?.data.hasThirdPartyAccess && (
        <DrawerAlertLinkThirdParty
          isOpen={isOpen}
          onClose={onClose}
          ownerName={data?.data.name}
        />
      )}
    </>
  );
};

export default Home;
