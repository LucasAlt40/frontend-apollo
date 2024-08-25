import { useToast } from "@chakra-ui/react";
import { Trash } from "react-feather";
import apiCommonInstance from "../../../../api/config/apiCommonInstance";

type Props = {
  genre: string;
};

const BlockedGenre = ({ genre }: Props) => {
  const toast = useToast();

  const unBlockGenre = async (genres: string[]) => {
    try {
      const response = await apiCommonInstance.put(
        "/establishment/playlist/genres/unblock",
        {
          genres: genres,
        }
      );

      if (response.status === 200) {
        toast({
          position: "top",
          title: "Gênero desbloqueado com sucesso!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
    } catch {
      toast({
        position: "top",
        title: "Opa! Parece que algo deu errado.",
        description:
          "Ocorreu um problema ao desbloquear o Gênero da playlist. Tente novamente.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="w-fit flex items-center gap-2 bg-white px-4 py-2 rounded-lg">
      <p>{genre}</p>
      <button
        onClick={() => {
          unBlockGenre([genre]);
        }}
      >
        <Trash color="var(--color-rose)" size={18} />
      </button>
    </div>
  );
};

export default BlockedGenre;
