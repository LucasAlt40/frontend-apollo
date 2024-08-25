import { useEffect, useState } from "react";
import { PlaylistType } from "../@types/PlaylistType";
import apiCommonInstance from "../../../api/apiCommonInstance";
import defaultImage from "../../../assets/images/default.jpg";
import { useToast } from "@chakra-ui/react";
import BlockedGenre from "./components/BlockedGenre";
import SimpleCard from "../../../components/SimpleCard/SimpleCard";
import DrawerGenres from "../../../components/DrawerGenres/DrawerGenres";
import { useDisclosure } from "@chakra-ui/react";
import { Edit, PlusCircle } from "react-feather";

const Playlist = () => {
  const toast = useToast();
  const [playlist, setPlaylist] = useState<PlaylistType>({} as PlaylistType);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [genres, setGenres] = useState<string[]>([]);

  const getPlaylist = async () => {
    try {
      const response = await apiCommonInstance.get("/establishment/playlist");

      if (response.status === 200) {
        setPlaylist(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const setPlaylistInitialGenres = async () => {
    try {
      const response = await apiCommonInstance.put(
        "/establishment/playlist/genres/initial",
        {
          genres: genres,
        }
      );

      if (response.status === 201) {
        toast({
          position: "top",
          title: "Genêros iniciais definidos com sucesso!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onClose();
        return;
      }
    } catch {
      toast({
        position: "top",
        title: "Opa! Parece que algo deu errado.",
        description:
          "Ocorreu um problema ao definir os genêros iniciais da playlist. Tente novamente.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const setBlockGenres = async () => {
    try {
      const response = await apiCommonInstance.put(
        "/establishment/playlist/genres/block",
        {
          genres: genres,
        }
      );

      if (response.status === 200) {
        toast({
          position: "top",
          title: "Genêros bloqueados com sucesso!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onClose();
        return;
      }
    } catch {
      toast({
        position: "top",
        title: "Opa! Parece que algo deu errado.",
        description:
          "Ocorreu um problema ao bloquear os genêros da playlist. Tente novamente.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    getPlaylist();
  }, []);

  return (
    <>
      <div className="w-full bg-[#f1f1f1] rounded-lg p-4 mb-5">
        <img
          className="rounded-lg"
          src={defaultImage}
          alt="Imagem da Playlist"
        />
        <div className="my-5">
          <p className="text-2xl font-bold">{playlist.name}</p>
          <p>{playlist.description}</p>
        </div>
      </div>

      <SimpleCard
        title="Gêneros bloqueados"
        description="Bloqueie gêneros para evitar musicas indesejadas."
      >
        <div className="flex flex-wrap gap-2">
          {playlist?.blockedGenres?.length > 0 &&
            playlist.blockedGenres.map((genre) => (
              <BlockedGenre key={genre} genre={genre} />
            ))}
          <button className="p-4 hover:text-primary" onClick={onOpen}>
            <PlusCircle size={16} />
          </button>
        </div>

        <DrawerGenres
          establishmentId="1"
          isOpen={isOpen}
          onClose={onClose}
          setGenres={setGenres}
          handleSubmit={setBlockGenres}
        />
      </SimpleCard>

      <SimpleCard
        title="Gêneros da playlist"
        description="Defina seu gosto, escolha até 3 gêneros para iniciar a playlist"
      >
        <div className="flex flex-wrap gap-2">
          {playlist?.initialGenres?.length > 0 &&
            playlist.initialGenres.map((genre) => (
              <BlockedGenre key={genre} genre={genre} />
            ))}
          <button className="p-4 hover:text-primary" onClick={onOpen}>
            <Edit size={16} />
          </button>
        </div>

        <DrawerGenres
          establishmentId="1"
          isOpen={isOpen}
          onClose={onClose}
          setGenres={setGenres}
          handleSubmit={setPlaylistInitialGenres}
        />
      </SimpleCard>
    </>
  );
};

export default Playlist;
