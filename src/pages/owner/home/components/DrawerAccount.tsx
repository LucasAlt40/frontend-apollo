import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { Link, LogOut, Trash, User } from "react-feather";
import { OwnerType } from "../../@types/OwnerType";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

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
          <DrawerHeader>Perfil</DrawerHeader>

          <DrawerBody>
            <div className="mb-5">
              <p className="font-bold">Informações da conta</p>
              <p>{owner.name}</p>
            </div>
            <div className="mb-5">
              <p className="font-bold">Spotify</p>
              {owner.hasThirdPartyAccess ? (
                <a className="flex justify-between" href="">
                  Desvincular conta
                  <Trash />
                </a>
              ) : (
                <a
                  className="flex justify-between"
                  href={import.meta.env.VITE_THIRD_PARTY_AUTHORIZATION_URL}
                >
                  Vincular uma conta Spotify
                  <Link />
                </a>
              )}
            </div>
            <div className="mb-5">
              <button
                className="w-full flex justify-between underline text-primary py-2"
                onClick={onLogoutOwner}
              >
                Sair <LogOut />
              </button>
            </div>
          </DrawerBody>

          <DrawerFooter>
            <div className="w-full flex flex-col">
              <Button variant="outline" onClick={onClose}>
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
