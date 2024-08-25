import apiCommonInstance from "../config/apiCommonInstance";

const apiUrl = "/establishment";

const getInfo = async (id: string) => {
  return await apiCommonInstance.get(`${apiUrl}/${id}`);
};

const getEstablishmentGenres = (id: string) => {
  return apiCommonInstance.get(`${apiUrl}/playlist/genres/${id}`);
};

export { getInfo, getEstablishmentGenres };
