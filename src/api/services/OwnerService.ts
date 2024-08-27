import { useQuery } from "@tanstack/react-query";
import apiCommonInstance from "../config/apiCommonInstance";

const apiUrl = "/owner";

// const GetQueryClient = () => {
//   const queryClient = useQueryClient();
//   return queryClient;
// };

const GetOwner = () => {
  const query = useQuery({
    queryKey: ["owner"],
    refetchOnWindowFocus: false,
    
    queryFn: async () => await apiCommonInstance.get(apiUrl),
  });
  return query;
};

export { GetOwner };
