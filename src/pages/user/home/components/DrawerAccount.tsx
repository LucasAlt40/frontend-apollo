import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Button,
  useDisclosure,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { User } from "react-feather";
import { useEffect, useState } from "react";
import { UserType } from "../../../../@types/UserType";
import { getDecodedAccessToken } from "../../../../utils";

type Props = {
  user: UserType;
};

const DrawerAccount = ({ user }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [timeRemaining, setTimeRemaining] = useState<string>("");

  useEffect(() => {
    const decodedToken = getDecodedAccessToken();

    if (decodedToken.exp) {
      const expirationTime = decodedToken.exp * 1000;

      const updateRemainingTime = () => {
        const currentTime = Date.now();
        const timeLeft = expirationTime - currentTime;

        if (timeLeft <= 0) {
          setTimeRemaining("00:00");
        } else {
          const hours = Math.floor((timeLeft / 1000 / 60 / 60) % 24);
          const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
          const seconds = Math.floor((timeLeft / 1000) % 60);
          setTimeRemaining(
            `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
              2,
              "0"
            )}:${String(seconds).padStart(2, "0")}`
          );
        }
      };

      updateRemainingTime();
      const intervalId = setInterval(updateRemainingTime, 1000);

      return () => clearInterval(intervalId);
    }
  }, []);

  return (
    <>
      <Button colorScheme="red" onClick={onOpen}>
        <User />
      </Button>
      <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent className="rounded-t-3xl">
          <DrawerCloseButton />
          <DrawerHeader>Perfil</DrawerHeader>

          <DrawerBody>
            <div className="mb-5">
              <p className="font-bold">Usuário</p>
              <p>{user.username}</p>
            </div>
            <div className="mb-5">
              <p className="font-bold">Sessão</p>
              <p>Sua sessão expira em: {timeRemaining}</p>
            </div>
          </DrawerBody>

          <DrawerFooter>
            <div className="w-full flex flex-col">
              <Button borderRadius={100} variant="outline" onClick={onClose}>
                Fechar
              </Button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerAccount;
