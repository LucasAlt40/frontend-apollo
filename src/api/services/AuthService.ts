import apiCommonInstance from "../config/apiCommonInstance";

const apiUrl = "/auth";

const sendAuthorizationCode = async (code: string) => {
  return await apiCommonInstance.post(`${apiUrl}/api`, {
    code,
  });
};

export { sendAuthorizationCode };
