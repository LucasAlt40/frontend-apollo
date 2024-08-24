import {
  Button,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { ArrowRight, Eye, EyeOff } from "react-feather";

import Cookies from "js-cookie";
import apiCommonInstance from "../../api/apiCommonInstance";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const OwnerLogin = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    establishmentId: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await apiCommonInstance.post("/auth/owner", formData);

      if (response.status !== 200) {
        toast({
          position: "top",
          title: "Opa! Parece que algo deu errado.",
          description: "Ocorreu um problema ao fazer o login. Tente novamente.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      Cookies.set("accessToken", response.data.accessToken, {
        expires: 2 / 24,
      });

      navigate("/owner/home");
    } catch {
      toast({
        position: "top",
        title: "Opa! Parece que algo deu errado.",
        description: "Ocorreu um problema ao fazer o login. Tente novamente.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <FormControl className="flex flex-col">
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
        <Input
          className="mb-4"
          color="var(--color-rose)"
          borderColor="var(--color-rose)"
          type="email"
          focusBorderColor="var(--color-rose)"
          width="auto"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <InputGroup size="md" className="mb-4">
          <Input
            borderColor="var(--color-rose)"
            color="var(--color-rose)"
            pr="4.5rem"
            focusBorderColor="var(--color-rose)"
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <InputRightElement width="4.5rem">
            {showPassword ? (
              <Eye
                color="var(--color-rose)"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <EyeOff
                color="var(--color-rose)"
                onClick={() => setShowPassword(true)}
              />
            )}
          </InputRightElement>
        </InputGroup>
        <Button
          colorScheme="red"
          rightIcon={<ArrowRight />}
          onClick={handleSubmit}
        >
          Acessar
        </Button>
      </FormControl>
    </>
  );
};

export default OwnerLogin;
