import { Button, FormControl, Input, useToast } from "@chakra-ui/react";
import { useState } from "react";
import apiCommonInstance from "../../api/apiCommonInstance";
import { ArrowRight, Headphones } from "react-feather";

interface UserLoginProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setUser: React.Dispatch<
    React.SetStateAction<any> //eslint-disable-line
  >;
}

const UserLogin: React.FC<UserLoginProps> = ({ setStep, setUser }) => {
  const toast = useToast();

  const [formData, setFormData] = useState<{
    establishmentId: string;
    username: string;
  }>({
    establishmentId: "",
    username: "",
  });
  const [showUsername, setShowUsername] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setUser((prevData: any) => ({ //eslint-disable-line
      ...prevData,
      [name]: value,
    }));
  };

  const handleSearchEstablishment = async () => {
    try {
      const response = await apiCommonInstance.get(
        `/establishment/${formData.establishmentId}`
      );

      if (!response.data.isOff) {
        setShowUsername(true);
      } else {
        showToast(
          "Opa! Parece que algo deu errado.",
          "O estabelecimento que você está tentando acessar não está em funcionamento no momento.",
          "error"
        );
      }
    } catch {
      showToast(
        "Opa! Parece que algo deu errado.",
        "O estabelecimento que você está tentando acessar não existe ou não está em funcionamento no momento.",
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
      {!showUsername && (
        <>
          <Input
            className="mb-4"
            color="var(--color-rose)"
            borderColor="var(--color-rose)"
            type="text"
            focusBorderColor="var(--color-rose)"
            width="auto"
            placeholder="Código do Estabelecimento"
            name="establishmentId"
            value={formData.establishmentId}
            onChange={handleChange}
          />
          <Button
            colorScheme="red"
            rightIcon={<ArrowRight />}
            onClick={handleSearchEstablishment}
          >
            Acessar
          </Button>
        </>
      )}
      {showUsername && (
        <>
          <Input
            className="mb-4"
            color="var(--color-rose)"
            borderColor="var(--color-rose)"
            type="text"
            focusBorderColor="var(--color-rose)"
            width="auto"
            placeholder="Digite um nome de usuário"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <Button
            colorScheme="red"
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
