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
import { UserType } from "../../../../@types/UserType";

type Props = {
  user: UserType;
};

const DrawerAccount = ({ user }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
              <p>Sua sessão expira em: xx:xx</p>
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
