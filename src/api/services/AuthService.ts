import apiCommonInstance from "../config/apiCommonInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserType } from "../../@types/UserType";
import { useToast } from "@chakra-ui/react";

const apiUrl = "/auth";

const SendAuthorizationCode = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (code: string) =>
      await apiCommonInstance.post(`${apiUrl}/api`, { code }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["owner"] });
      toast({
        position: "top",
        title: "Conta Spotify vinculada com sucesso!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
    onError: (error) => {
      console.log(error);
      toast({
        position: "top",
        title:
          "Não foi possível vincular sua conta Spotify. Tente novamente mais tarde.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  return mutation;
};

const LoginUser = () => {
  const mutation = useMutation({
    mutationFn: async (user: UserType) =>
      await apiCommonInstance.post(`${apiUrl}/user`, user),
  });

  return mutation;
};

export { SendAuthorizationCode, LoginUser };
