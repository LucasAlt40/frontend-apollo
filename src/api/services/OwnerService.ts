import apiCommonInstance from "../config/apiCommonInstance";

const apiUrl = "/owner";

const getOwner = async () => {
  return apiCommonInstance.get(apiUrl);
};

export { getOwner };
