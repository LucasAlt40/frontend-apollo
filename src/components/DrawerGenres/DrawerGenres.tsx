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
import { useEffect, useState } from "react";
import { GenresAvailableType } from "./@types/GenresAvailableType";
import GenreCard from "../GenreCard/GenreCard";
import apiCommonInstance from "../../api/apiCommonInstance";

type Props = {
  establishmentId: string;
  isOpen: boolean;
  onClose: () => void;
  setGenres: React.Dispatch<React.SetStateAction<string[]>>;
  handleSubmit: () => void;
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
  const [genres, setAvailableGenres] = useState<GenresAvailableType>();
  const [selectedGenres, setSelectedGenres] =
    useState<string[]>(preSelectedGenres);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (isOpen) {
      const fetchGenres = async () => {
        try {
          const response = await apiCommonInstance.get(
            `/establishment/playlist/genres/${establishmentId}`
          );
          setAvailableGenres(response.data);
        } catch (error) {
          console.error("Failed to fetch genres", error);
        }
      };
      fetchGenres();
    }
  }, [establishmentId, isOpen]);

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

  const filteredGenres = genres
    ? Object.entries(genres.genresAvailable).filter(([genre]) =>
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
                pr="4.5rem"
                focusBorderColor="var(--color-rose)"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <InputRightElement width="4.5rem">
                <Search />
              </InputRightElement>
            </InputGroup>
          </div>

          <div className="w-full grid grid-cols-2 items-center gap-4">
            {filteredGenres.map(([genre, votes]) => (
              <GenreCard
                key={genre}
                name={genre}
                votes={votes}
                totalVotes={genres?.totalVotes || 0}
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
