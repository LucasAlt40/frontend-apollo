import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { Check, Search } from "react-feather";
import { useState } from "react";
import GenreCard from "../GenreCard/GenreCard";
import { GetEstablishmentGenres } from "../../api/services/EstablishmentService";

type Props = {
  establishmentId: string;
  isOpen: boolean;
  onClose: () => void;
  setGenres: React.Dispatch<React.SetStateAction<string[]>>;
  handleSubmit: any;
  preSelectedGenres?: string[];
  genreLimit?: number;
  drawerTitle?: string;
};

const DrawerGenres = ({
  establishmentId,
  isOpen,
  onClose,
  setGenres,
  handleSubmit,
  preSelectedGenres = [],
  genreLimit = 3,
  drawerTitle = "Selecionar Gêneros",
}: Props) => {
  const [selectedGenres, setSelectedGenres] =
    useState<string[]>(preSelectedGenres);
  const [searchTerm, setSearchTerm] = useState("");

  const { data } = GetEstablishmentGenres(establishmentId);

  const handleSelect = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      const newSelectedGenres = selectedGenres.filter((g) => g !== genre);
      setSelectedGenres(newSelectedGenres);
      setGenres(newSelectedGenres);
    } else {
      if (selectedGenres.length < genreLimit) {
        const newSelectedGenres = [...selectedGenres, genre];
        setSelectedGenres(newSelectedGenres);
        setGenres(newSelectedGenres);
      }
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredGenres = data?.data.genresAvailable
    ? Object.entries(data?.data.genresAvailable).filter(([genre]) =>
        genre.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent maxH="80dvh" className="rounded-t-3xl">
        <DrawerCloseButton />
        <DrawerHeader>{drawerTitle}</DrawerHeader>
        <DrawerBody>
          <div className="w-full sticky top-0 z-10 bg-white">
            <InputGroup size="md" className="mb-4">
              <Input
                placeholder="Buscar gênero"
                borderColor="var(--color-rose)"
                color="var(--color-rose)"
                colorScheme="red"
                width="100%"
                borderRadius="50px"
                height="50px"
                focusBorderColor="var(--color-rose)"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <InputRightElement width="4rem">
                <Search className="mt-2" />
              </InputRightElement>
            </InputGroup>
          </div>

          <div className="w-full grid grid-cols-2 items-center gap-4">
            {filteredGenres.map(([genre, votes]) => (
              <GenreCard
                key={genre}
                name={genre}
                votes={votes}
                totalVotes={data?.data?.totalVotes || 0}
                handleSelect={handleSelect}
                disabled={
                  selectedGenres.length >= genreLimit &&
                  !selectedGenres.includes(genre)
                }
                initiallySelected={selectedGenres.includes(genre)}
              />
            ))}
          </div>
        </DrawerBody>
        <DrawerFooter>
          <Button
            className="w-full"
            colorScheme="red"
            width="100%"
            borderRadius="50px"
            height="50px"
            rightIcon={<Check />}
            onClick={handleSubmit}
          >
            Finalizar
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerGenres;
