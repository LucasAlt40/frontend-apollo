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
    onError: (err: any) => {
      if (err.response.status === 406) {
        toast({
          position: "top",
          title: "Você precisa definir os gêneros inicias da playlist.",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      toast({
        position: "top",
        title: "Não foi possível ligar o estabelecimento",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
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
      queryClient.invalidateQueries({
        queryKey: ["establishmentPlaylist"],
      });
      queryClient.invalidateQueries({
        queryKey: ["establishment"],
      });
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

const SetPlaylistInitialGenres = (onClose: any) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (genres: string[]) =>
      await apiCommonInstance.put("/establishment/playlist/genres/initial", {
        genres,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["establishmentPlaylist"] });
      toast({
        position: "top",
        title: "Gêneros inicias definidos com sucesso!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    },
    onError: () =>
      toast({
        position: "top",
        title: "Não foi possível definir os gêneros inicias.",
        status: "error",
        duration: 5000,
        isClosable: true,
      }),
  });
  return mutation;
};

const SetBlockGenres = (onClose: any) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (genres: string[]) =>
      await apiCommonInstance.put("/establishment/playlist/genres/block", {
        genres: genres,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["establishmentPlaylist"] });
      toast({
        position: "top",
        title: "Gêneros bloqueados com sucesso!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    },
    onError: () =>
      toast({
        position: "top",
        title: "Não foi possível bloquear os gêneros.",
        status: "error",
        duration: 5000,
        isClosable: true,
      }),
  });
  return mutation;
};

const UnBlockGenres = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (genres: string[]) =>
      await apiCommonInstance.put("/establishment/playlist/genres/unblock", {
        genres: genres,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["establishmentPlaylist"] });
      toast({
        position: "top",
        title: "Gênero desbloqueado!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
    onError: () =>
      toast({
        position: "top",
        title: "Não foi possível desbloquear o gênero.",
        status: "error",
        duration: 5000,
        isClosable: true,
      }),
  });
  return mutation;
};

const GetPlayerState = () => {
  const query = useQuery({
    queryKey: ["playerState"],
    refetchOnWindowFocus: false,
    queryFn: async () => await apiCommonInstance.get("establishment/player"),
  });

  return query;
};

const ResumePlayer = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () =>
      await apiCommonInstance.put("/establishment/player/resume"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playerState"] });
    },
    onError: () =>
      toast({
        position: "top",
        title: "Não foi possível retomar a música.",
        status: "error",
        duration: 5000,
        isClosable: true,
      }),
  });
  return mutation;
};

const PausePlayer = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () =>
      await apiCommonInstance.put("/establishment/player/pause"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playerState"] });
    },
    onError: () =>
      toast({
        position: "top",
        title: "Não foi possível pausar a música.",
        status: "error",
        duration: 5000,
        isClosable: true,
      }),
  });
  return mutation;
};

const NextMusic = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () =>
      await apiCommonInstance.post("/establishment/player/next"),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["playerState"] });
      }, 350);
    },
    onError: () =>
      toast({
        position: "top",
        title: "Não foi possível pular a música.",
        status: "error",
        duration: 5000,
        isClosable: true,
      }),
  });
  return mutation;
};

const PreviousMusic = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () =>
      await apiCommonInstance.post("/establishment/player/previous"),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["playerState"] });
      }, 350);
    },
    onError: () =>
      toast({
        position: "top",
        title: "Não foi possível pular a música.",
        status: "error",
        duration: 5000,
        isClosable: true,
      }),
  });
  return mutation;
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
  SetPlaylistInitialGenres,
  SetBlockGenres,
  UnBlockGenres,
  GetPlayerState,
  ResumePlayer,
  PausePlayer,
  NextMusic,
  PreviousMusic,
};
