import { useQuery } from "@tanstack/react-query";
import apiCommonInstance from "../config/apiCommonInstance";

const apiUrl = "/establishment";

const GetEstablishmentById = (id: string) => {
  const query = useQuery({
    queryFn: async () => await apiCommonInstance.get(`${apiUrl}/${id}`),
    queryKey: ["establishment-info"],
    enabled: !!id,
  });

  return query;
};

const getEstablishment = async () => {
  return await apiCommonInstance.get(apiUrl);
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

const getAvailableDevices = async () => {
  return await apiCommonInstance.get(`${apiUrl}/devices`);
};

const setMainDevice = async (deviceId: string) => {
  return await apiCommonInstance.post(`${apiUrl}/devices`, {
    id: deviceId,
  });
};

const turnOnEstablishment = async () => {
  return await apiCommonInstance.post("/establishment/turn-on");
};

const turnOffEstablishment = async () => {
  return await apiCommonInstance.post("/establishment/turn-off");
};

const getEstablishmentPlaylist = async () => {
  return await apiCommonInstance.get("/establishment/playlist");
};

const createEstablishmentPlaylist = async () => {
  return await apiCommonInstance.post("/establishment/playlist");
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
  getEstablishment,
  GetEstablishmentGenres,
  getAvailableDevices,
  setMainDevice,
  turnOnEstablishment,
  turnOffEstablishment,
  getEstablishmentPlaylist,
  createEstablishmentPlaylist,
  getPlaylist,
  setPlaylistInitialGenres,
  setBlockGenres,
  unBlockGenres,
};
