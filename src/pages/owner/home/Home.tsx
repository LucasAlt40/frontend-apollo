import axios from "axios";
import DrawerAccount from "./components/DrawerAccount";
import { useEffect, useState } from "react";
import { Owner } from "../@types/OwnerType";
import { useSearchParams } from "react-router-dom";

const sendAuthorizationCode = (code: string) => {
  axios
    .post(`http://localhost:8080/auth/api`, {
      headers: {
        ContentType: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJSUzI1NiJ9.eyJvd25lcklkIjoxLCJlc3RhYmxpc2htZW50SWQiOjEsImVtYWlsIjoiemluaG9AZ21haWwuY29tIiwiZXhwIjoxNzI0NDM5ODg5fQ.bAvNAWvqMDfhKVK6dMwL4pwFbbVFnPGEjmyGe9B94yd4PLHKl7JiLQwPW2MbRG_Ncf51oTG9lMHXSsSjG9klHCQi-Q52JnXcofuy1RZTa-GT_lwGA_f9pVqViU9rjRQSN2dJn9-Nz9IepyyGiUZEFCEIgC6dLdFqD2dAF0z6eCqkFkHfXb7J_ua0Ol69R7B1K3wltx4wgEXWs3pj4iLtumZ5597dTPAwamI6qF6FFt7H30Y9i-m7QIar1CTCiUgN9275XAczsQJyYpbVABCToDgp3sRvQNvxxZfwb4J0AYiNkZ7IRIgHP1a6TbTSm8VACxnnJGdg57vV1LquPeuHNw",
      },
      body: {
        code: code,
      },
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const code = searchParams.get("code");

  const [owner, setOwner] = useState<Owner>({} as Owner);

  const getOwner = () => {
    axios
      .get("http://localhost:8080/owner", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJSUzI1NiJ9.eyJvd25lcklkIjoxLCJlc3RhYmxpc2htZW50SWQiOjEsImVtYWlsIjoiemluaG9AZ21haWwuY29tIiwiZXhwIjoxNzI0NDM5ODg5fQ.bAvNAWvqMDfhKVK6dMwL4pwFbbVFnPGEjmyGe9B94yd4PLHKl7JiLQwPW2MbRG_Ncf51oTG9lMHXSsSjG9klHCQi-Q52JnXcofuy1RZTa-GT_lwGA_f9pVqViU9rjRQSN2dJn9-Nz9IepyyGiUZEFCEIgC6dLdFqD2dAF0z6eCqkFkHfXb7J_ua0Ol69R7B1K3wltx4wgEXWs3pj4iLtumZ5597dTPAwamI6qF6FFt7H30Y9i-m7QIar1CTCiUgN9275XAczsQJyYpbVABCToDgp3sRvQNvxxZfwb4J0AYiNkZ7IRIgHP1a6TbTSm8VACxnnJGdg57vV1LquPeuHNw",
        },
      })
      .then((res) => setOwner(res.data))
      .catch((err) => err);
  };

  useEffect(() => {
    getOwner();
  }, []);

  if (!owner.hasThirdPartyAccess) {
    if (code !== null) {
      sendAuthorizationCode(code);
    }
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <p className="font-bold">{owner?.name}</p>
        <DrawerAccount owner={owner} />
      </div>
      <p>Turn on establishment option</p>
    </>
  );
};

export default Home;
