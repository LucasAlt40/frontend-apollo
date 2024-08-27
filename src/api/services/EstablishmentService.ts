import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiCommonInstance from "../config/apiCommonInstance";
import { useToast } from "@chakra-ui/react";

const apiUrl = "/establishment";

const GetEstablishmentById = (id: string) => {
  const query = useQuery({
    queryFn: async () => await apiCommonInstance.get(`${apiUrl}/${id}`),
    queryKey: ["establishment-info"],
    enabled: !!id,
  });

  return query;
};

const GetEstablishment = () => {
  const query = useQuery({
    queryKey: ["establishment"],
    refetchOnWindowFocus: false,
    queryFn: async () => await apiCommonInstance.get(apiUrl),
  });
  return query;
};

const GetEstablishmentGenres = (id: string) => {
  const query = useQuery({
    queryKey: ["establishmentGenres", id],
    refetchOnWindowFocus: false,
    queryFn: () => apiCommonInstance.get(`${apiUrl}/playlist/genres/${id}`),
    enabled: !!id,
  });
  return query;
};

const GetAvailableDevices = () => {
  const query = useQuery({
    queryKey: ["establishmentDevices"],
    refetchOnWindowFocus: false,
    queryFn: async () => await apiCommonInstance.get(`${apiUrl}/devices`),
  });
  return query;
};

const SetMainDevice = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (deviceId: string) =>
      await apiCommonInstance.post(`${apiUrl}/devices`, {
        id: deviceId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["establishmentDevices"] });
      toast({
        position: "top",
        title: "Dispositivo selecionado",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
    onError: () =>
      toast({
        position: "top",
        title: "Não foi possível selecionar o dispositivo",
        status: "error",
        duration: 5000,
        isClosable: true,
      }),
  });

  return mutation;
};

const TurnOnEstablishment = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () =>
      await apiCommonInstance.post("/establishment/turn-on"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["establishment"] });
      toast({
        position: "top",
        title: "Estabelecimento ligado",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
    onError: () =>
      toast({
        position: "top",
        title: "Não foi possível ligar o estabelecimento",
        status: "error",
        duration: 5000,
        isClosable: true,
      }),
  });

  return mutation;
};

const TurnOffEstablishment = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () =>
      await apiCommonInstance.post("/establishment/turn-off"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["establishment"] });
      toast({
        position: "top",
        title: "Estabelecimento desligado",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
    onError: () =>
      toast({
        position: "top",
        title: "Não foi possível desligar o estabelecimento",
        status: "error",
        duration: 5000,
        isClosable: true,
      }),
  });

  return mutation;
};

const GetEstablishmentPlaylist = () => {
  const query = useQuery({
    queryKey: ["establishmentPlaylist"],
    refetchOnWindowFocus: false,
    queryFn: async () => await apiCommonInstance.get("/establishment/playlist"),
  });
  return query;
};

const CreateEstablishmentPlaylist = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () =>
      await apiCommonInstance.post("/establishment/playlist"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["establishmentPlaylist"] });
      toast({
        position: "top",
        title: "Playlist gerada com sucesso!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
    onError: () =>
      toast({
        position: "top",
        title: "Não foi possível gerar a playlist",
        status: "error",
        duration: 5000,
        isClosable: true,
      }),
  });
  return mutation;
};

const getPlaylist = async () => {
  return await apiCommonInstance.get("/establishment/playlist");
};

const setPlaylistInitialGenres = async (genres: string[]) => {
  return await apiCommonInstance.put("/establishment/playlist/genres/initial", {
    genres,
  });
};

const setBlockGenres = async (genres: string[]) => {
  return await apiCommonInstance.put("/establishment/playlist/genres/block", {
    genres: genres,
  });
};

const unBlockGenres = async (genres: string[]) => {
  return await apiCommonInstance.put("/establishment/playlist/genres/unblock", {
    genres: genres,
  });
};

export {
  GetEstablishmentById,
  GetEstablishment,
  GetEstablishmentGenres,
  GetAvailableDevices,
  SetMainDevice,
  TurnOnEstablishment,
  TurnOffEstablishment,
  GetEstablishmentPlaylist,
  CreateEstablishmentPlaylist,
  getPlaylist,
  setPlaylistInitialGenres,
  setBlockGenres,
  unBlockGenres,
};
