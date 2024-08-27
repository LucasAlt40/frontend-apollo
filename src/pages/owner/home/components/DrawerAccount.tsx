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
import { Link, LogOut, User } from "react-feather";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { OwnerType } from "../../../../@types/OwnerType";

type Props = {
  owner: OwnerType;
};

const DrawerAccount = ({ owner }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const onLogoutOwner = () => {
    Cookies.remove("accessToken");
    navigate("/");
  };

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
              <p className="font-bold">Nome</p>
              <p>{owner.name}</p>
            </div>
            <div className="mb-5">
              <p className="font-bold">Spotify</p>
              {owner.hasThirdPartyAccess ? (
                <p>Conta vinculada</p>
              ) : (
                <a
                  className="flex justify-between"
                  href={import.meta.env.VITE_THIRD_PARTY_AUTHORIZATION_URL}
                >
                  Vincular uma conta Spotify
                  <Link size={16} />
                </a>
              )}
            </div>
            <div className="mb-5">
              <Button
                className="w-full flex items-center "
                colorScheme="red"
                variant="link"
                rightIcon={<LogOut size={16} />}
                onClick={onLogoutOwner}
              >
                <p className="underline w-full text-start ">Sair</p>
              </Button>
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
