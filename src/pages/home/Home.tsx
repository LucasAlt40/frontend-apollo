import axios from "axios";

const Home = () => {
  axios
    .get("http://localhost:8080/owner", {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJSUzI1NiJ9.eyJvd25lcklkIjoxLCJlc3RhYmxpc2htZW50SWQiOjEsImVtYWlsIjoiemluaG9AZ21haWwuY29tIiwiZXhwIjoxNzI0NDM5ODg5fQ.bAvNAWvqMDfhKVK6dMwL4pwFbbVFnPGEjmyGe9B94yd4PLHKl7JiLQwPW2MbRG_Ncf51oTG9lMHXSsSjG9klHCQi-Q52JnXcofuy1RZTa-GT_lwGA_f9pVqViU9rjRQSN2dJn9-Nz9IepyyGiUZEFCEIgC6dLdFqD2dAF0z6eCqkFkHfXb7J_ua0Ol69R7B1K3wltx4wgEXWs3pj4iLtumZ5597dTPAwamI6qF6FFt7H30Y9i-m7QIar1CTCiUgN9275XAczsQJyYpbVABCToDgp3sRvQNvxxZfwb4J0AYiNkZ7IRIgHP1a6TbTSm8VACxnnJGdg57vV1LquPeuHNw",
      },
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });

  return (
    <>
      <p>Drawer account</p>
      <p>Turn on establishment option</p>
    </>
  );
};

export default Home;
