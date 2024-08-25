import { useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import apiCommonInstance from "../../api/apiCommonInstance";
import Cookies from "js-cookie";

import { Button, useDisclosure, useToast } from "@chakra-ui/react";
import { ArrowLeft, Shield, User } from "react-feather";

import style from "./index.module.css";
import OwnerLogin from "../OwnerLogin/OwnerLogin";
import UserLogin from "../UserLogin/UserLogin";
import DrawerGenres from "../DrawerGenres/DrawerGenres";
import { UserType } from "../@types/UserType";

const BottomLogin = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [isOwner, setIsOwner] = useState(false);
  const [genres, setGenres] = useState<string[]>([]);
  const [user, setUser] = useState<UserType>({
    establishmentId: "",
    username: "",
    genres: [],
  });

  useEffect(() => {
    if (step === 2) {
      onOpen();
    }
  }, [step, onOpen]);

  useEffect(() => {
    setUser((prevData) => ({ ...prevData, genres }));
  }, [genres]);

  const handleStepChange = (newStep: number, ownerStatus: boolean) => {
    setIsOwner(ownerStatus);
    setStep(newStep);
  };

  const handleDrawerClose = () => {
    if (step > 0) setStep(step - 1);
    onClose();
  };

  const handleSubmit = async () => {
    if (user.establishmentId && user.genres.length > 0 && user.username) {
      const response = await apiCommonInstance.post("/auth/user", user);
      if (response.data) {
        Cookies.set("user", JSON.stringify(user), {
          expires: 2 / 24,
        });
        navigate("user/home");
      } else {
        toast({
          title: "Erro",
          description: "Algo deu errado ao tentar entrar no estabelecimento.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos antes de prosseguir.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const renderStepContent = (): ReactNode => {
    switch (step) {
      case 0:
        return (
          <>
            <Button
              colorScheme="red"
              variant="outline"
              rightIcon={<Shield />}
              className="m-4"
              onClick={() => handleStepChange(1, true)}
            >
              Proprietário
            </Button>
            <Button
              colorScheme="red"
              rightIcon={<User />}
              className="m-4"
              onClick={() => handleStepChange(1, false)}
            >
              Usuário
            </Button>
          </>
        );
      case 1:
        return isOwner ? (
          <OwnerLogin />
        ) : (
          <UserLogin setStep={setStep} setUser={setUser} />
        );
      case 2:
        return (
          <DrawerGenres
            drawerTitle="Selecione até 3 gêneros"
            setGenres={setGenres}
            establishmentId={user.establishmentId}
            isOpen={isOpen}
            onClose={handleDrawerClose}
            handleSubmit={handleSubmit}
            genreLimit={3}
          />
        );
      default:
        return null;
    }
  };

  const getStepTitle = (): string => {
    switch (step) {
      case 1:
        return isOwner ? "Proprietário" : "Estabelecimento";
      case 2:
        return "Escolher Gêneros";
      default:
        return "Quem é você?";
    }
  };

  return (
    <div className={style.loginForm}>
      {step > 0 && (
        <ArrowLeft
          size={32}
          className="absolute top-0 ml-4 mt-4 self-start"
          onClick={() => step > 0 && setStep(step - 1)}
        />
      )}
      <p className="mb-4">{getStepTitle()}</p>
      <div className="flex flex-col justify-between items-center">
        {renderStepContent()}
      </div>
    </div>
  );
};

export default BottomLogin;
