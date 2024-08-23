import {
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  Shield,
  User,
} from "react-feather";
import style from "./index.module.css";
import React, { useState } from "react";
import {
  Button,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import apiCommonInstance from "../../api/apiCommonInstance";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const BottomLogin: React.FC = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
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

      navigate("/home/owner");
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

  const handleBack = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const steps = [
    <>
      <Button
        colorScheme="red"
        variant="outline"
        rightIcon={<Shield />}
        className="m-4"
        onClick={() => setStep((prevState) => prevState + 1)}
      >
        Proprietário
      </Button>

      <Button className="m-4" colorScheme="red" rightIcon={<User />}>
        Usuário
      </Button>
    </>,
    <>
      <FormControl className="flex flex-col">
        <Input
          className="mb-4"
          color="var(--color-rose)"
          borderColor="var(--color-rose)"
          type="text"
          focusBorderColor="var(--color-rose)"
          width="auto"
          placeholder="Id do Estabelecimento"
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
    </>,
  ];

  return (
    <div className={style.loginForm}>
      {step > 0 && (
        <ArrowLeft size={32} className="absolute top-0 ml-4 mt-4 self-start" onClick={handleBack} />
      )}
      <p className="mb-4">{step === 1 ? "Proprietário" : "Quem é você?"}</p>
      <div className="flex flex-col justify-between items-center">
        {steps[step]}
      </div>
    </div>
  );
};

export default BottomLogin;
