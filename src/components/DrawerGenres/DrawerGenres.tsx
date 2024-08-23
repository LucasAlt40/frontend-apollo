import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Input,
} from "@chakra-ui/react";
import { ArrowRight, Plus } from "react-feather";

type Props = {
  genres: Map<string, number>;
};

const DrawerGenres = ({ genres }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button variant="outline" onClick={onOpen}>
        <Plus size={16} />
      </Button>
      <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent maxH="80dvh" className="rounded-t-3xl">
          <DrawerCloseButton />
          <DrawerHeader>Escolher Gêneros</DrawerHeader>

          <DrawerBody>
            <Input placeholder="Buscar gênero" />

            <div>{JSON.stringify(genres)}</div>
          </DrawerBody>

          <DrawerFooter>
            <div className="w-full">
              <Button
                className="w-full mb-2"
                variant="outline"
                mr={3}
                onClick={onClose}
              >
                Fechar
              </Button>
              <Button
                className="w-full"
                colorScheme="red"
                rightIcon={<ArrowRight />}
              >
                Finalizar
              </Button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerGenres;
