import apiCommonInstance from "../config/apiCommonInstance";

const apiUrl = "/establishment";

const getEstablishmentById = async (id: string) => {
  return await apiCommonInstance.get(`${apiUrl}/${id}`);
};

const getEstablishment = async () => {
  return await apiCommonInstance.get(apiUrl);
};

const getEstablishmentGenres = (id: string) => {
  return apiCommonInstance.get(`${apiUrl}/playlist/genres/${id}`);
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
  getEstablishmentById,
  getEstablishment,
  getEstablishmentGenres,
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
