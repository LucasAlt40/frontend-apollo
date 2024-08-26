import { Button, FormControl, Input, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { ArrowRight, Headphones } from "react-feather";
import { UserType } from "../../@types/UserType";
import { GetEstablishmentById } from "../../api/services/EstablishmentService";

interface UserLoginProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
}

const UserLogin: React.FC<UserLoginProps> = ({ setStep, setUser }) => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    establishmentId: "",
    username: "",
  });
  const [showUsername, setShowUsername] = useState(false);

  const { data } = GetEstablishmentById(formData.establishmentId);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setUser((prevData: UserType) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSearchEstablishment = async () => {
    if (data && !data?.data.isOff) {
      setShowUsername(true);
    } else {
      showToast(
        "Opa! Parece que algo deu errado.",
        "O estabelecimento que você está tentando acessar não está em funcionamento no momento.",
        "error"
      );
    }
  };

  const showToast = (title: string, description: string, status: "error") => {
    toast({
      position: "top",
      title,
      description,
      status,
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <FormControl className="flex flex-col">
      {!showUsername ? (
        <>
          <Input
            className="mb-4"
            color="var(--color-rose)"
            borderColor="var(--color-rose)"
            type="text"
            focusBorderColor="var(--color-rose)"
            width="100%"
            borderRadius="50px"
            height="50px"
            placeholder="Código do Estabelecimento"
            name="establishmentId"
            value={formData.establishmentId}
            onChange={handleChange}
          />
          <Button
            colorScheme="red"
            width="100%"
            borderRadius="50px"
            height="50px"
            rightIcon={<ArrowRight />}
            onClick={handleSearchEstablishment}
          >
            Acessar
          </Button>
        </>
      ) : (
        <>
          <Input
            className="mb-4"
            color="var(--color-rose)"
            borderColor="var(--color-rose)"
            type="text"
            focusBorderColor="var(--color-rose)"
            width="100%"
            borderRadius="50px"
            height="50px"
            placeholder="Digite um nome de usuário"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <Button
            colorScheme="red"
            width="100%"
            borderRadius="50px"
            height="50px"
            rightIcon={<Headphones />}
            onClick={() => setStep(2)}
          >
            Participar
          </Button>
        </>
      )}
    </FormControl>
  );
};

export default UserLogin;
