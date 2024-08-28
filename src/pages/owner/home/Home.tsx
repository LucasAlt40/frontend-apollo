import { useSearchParams } from "react-router-dom";
import { Alert, AlertIcon, Skeleton, useDisclosure } from "@chakra-ui/react";
import { GetOwner } from "../../../api/services/OwnerService";
import { SendAuthorizationCode } from "../../../api/services/AuthService";
import DrawerAccount from "./components/DrawerAccount";
import Establishment from "./components/Establishment";
import { useEffect, useState } from "react";
import DrawerAlertLinkThirdParty from "./components/DrawerAlertLinkThirdParty";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isLoading, error, data } = GetOwner();
  const { mutate } = SendAuthorizationCode();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isAlertOpened, setIsAlertOpened] = useState(false);

  useEffect(() => {
    const code = searchParams.get("code");
    if (!isLoading) {
      if (!data?.data.hasThirdPartyAccess) {
        if (code !== null) {
          mutate(code);
          searchParams.delete("code");
          setSearchParams(searchParams);
        } else if (!isAlertOpened) {
          onOpen();
          setIsAlertOpened(true);
        }
      }
    }
  }, [
    searchParams,
    mutate,
    setSearchParams,
    data,
    isAlertOpened,
    onOpen,
    isLoading,
  ]);

  return (
    <>
      {!isLoading && !data?.data.hasThirdPartyAccess && (
        <div className="mb-5">
          <Alert className="rounded-lg" status="warning">
            <AlertIcon />
            Atenção! Sua conta não possui vinculo com spotify
          </Alert>
        </div>
      )}

      <div className="flex justify-between items-center mb-5">
        {isLoading && <Skeleton width="100%" height="50px"></Skeleton>}
        {!isLoading && !error && (
          <>
            <p className="font-bold">{data?.data.name}</p>
            <DrawerAccount owner={data?.data} />
          </>
        )}
      </div>

      <Establishment owner={data?.data} />

      {!data?.data.hasThirdPartyAccess && (
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
