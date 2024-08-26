import { useMutation } from "@tanstack/react-query";
import { UserType } from "../../@types/UserType";
import apiCommonInstance from "../config/apiCommonInstance";

const apiUrl = "/auth";

const sendAuthorizationCode = async (code: string) => {
  return await apiCommonInstance.post(`${apiUrl}/api`, {
    code,
  });
};

const LoginUser = () => {
  const mutation = useMutation({
    mutationFn: (user: UserType) =>
      apiCommonInstance.post(`${apiUrl}/user`, user),
  });

  return mutation;
};

export { sendAuthorizationCode, LoginUser };
