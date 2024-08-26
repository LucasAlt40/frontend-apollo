import DrawerAccount from "./components/DrawerAccount";
import { useSearchParams } from "react-router-dom";
import { Alert, AlertIcon, useDisclosure } from "@chakra-ui/react";
import DrawerAlertLinkThirdParty from "./components/DrawerAlertLinkThirdParty";
import { useQuery } from "@tanstack/react-query";
import { getOwner } from "../../../api/services/OwnerService";
import { sendAuthorizationCode } from "../../../api/services/AuthService";
import { useState } from "react";
import Establishment from "./components/Establishment";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isPending, error, data } = useQuery({
    queryKey: ["owner"],
    refetchOnWindowFocus: false,
    queryFn: () => getOwner(),
  });

  const [isAlertOpened, setIsAlertOpened] = useState(false);

  if (!isPending && !error) {
    if (!data?.data.hasThirdPartyAccess) {
      const code = searchParams.get("code");

      if (code !== null) {
        sendAuthorizationCode(code);
        searchParams.delete("code");
        setSearchParams(searchParams);
      } else if (!isAlertOpened) {
        onOpen();
        setIsAlertOpened(true);
      }
    }
  }

  return (
    <>
      {!data?.data.hasThirdPartyAccess && (
        <div className="mb-5">
          <Alert className="rounded-lg" status="warning">
            <AlertIcon />
            Atenção! Sua conta não possui vinculo com spotify
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

      <Establishment />

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
