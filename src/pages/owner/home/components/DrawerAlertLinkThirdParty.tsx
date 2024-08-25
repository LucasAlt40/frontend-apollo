import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-feather";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  ownerName: string;
};

const DrawerAlertLinkThirdParty = ({ isOpen, onClose, ownerName }: Props) => {
  return (
    <>
      <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent maxH="80dvh" className="rounded-t-3xl">
          <DrawerCloseButton />
          <DrawerHeader>Vincular conta Spotify</DrawerHeader>

          <DrawerBody>
            <p>Olá, {ownerName}!</p>
            <p>
              Para que você possa utilizar a aplicação e suas funcionalidade é
              preciso vincular uma conta Spotify Premium.Nossa aplicação utiliza
              do Spotify para poder fornecer as músicas ao estabelecimento.
            </p>
            <p>
              <a className="underline" href="#">
                Por que fazemos isso?
              </a>
            </p>
          </DrawerBody>

          <DrawerFooter>
            <div className="w-full flex flex-col">
              <Button
                className="w-full mb-2"
                variant="outline"
                mr={3}
                onClick={onClose}
              >
                Fechar
              </Button>
              <a
                className="w-full  p-2 flex items-center justify-center rounded-full bg-primary text-white hover:opacity-90"
                href={import.meta.env.VITE_THIRD_PARTY_AUTHORIZATION_URL}
              >
                Vincular <Link />
              </a>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerAlertLinkThirdParty;
