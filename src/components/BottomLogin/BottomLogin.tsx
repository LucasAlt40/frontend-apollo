import { useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Button, useDisclosure, useToast } from "@chakra-ui/react";
import { ArrowLeft, Shield, User } from "react-feather";
import { UserType } from "../../@types/UserType";
import OwnerLogin from "../OwnerLogin/OwnerLogin";
import UserLogin from "../UserLogin/UserLogin";
import DrawerGenres from "../DrawerGenres/DrawerGenres";
import { LoginUser } from "../../api/services/AuthService";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

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

  const { mutate, isSuccess, isError, isPending, data } = LoginUser(); // Adicione isLoading

  const handleStepChange = (newStep: number, ownerStatus: boolean) => {
    setIsOwner(ownerStatus);
    setStep(newStep);
  };

  const handleDrawerClose = () => {
    if (step > 0) setStep(step - 1);
    onClose();
  };

  const handleSubmit = () => {
    if (user.establishmentId && user.genres.length > 0 && user.username) {
      mutate(user);
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
              width="100%"
              borderRadius="50px"
              height="50px"
              colorScheme="red"
              rightIcon={<User />}
              className="mb-4"
              onClick={() => handleStepChange(1, false)}
            >
              <p className="text-lg">Usuário</p>
            </Button>
            <Button
              width="100%"
              borderRadius="50px"
              height="50px"
              colorScheme="red"
              variant="outline"
              rightIcon={<Shield />}
              className="mb-4"
              onClick={() => handleStepChange(1, true)}
            >
              <p className="text-lg">Proprietário</p>
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

  useEffect(() => {
    if (step === 2) {
      onOpen();
    }
  }, [step, onOpen]);

  useEffect(() => {
    setUser((prevData) => ({ ...prevData, genres }));
  }, [genres]);

  useEffect(() => {
    if (isSuccess) {
      Cookies.set("accessToken", data?.data.accessToken, {
        expires: 2 / 24,
      });
      onClose();
      navigate("user/home");
    }

    if (isError) {
      toast({
        title: "Erro",
        description: "Algo deu errado ao tentar entrar no estabelecimento.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [isSuccess, isError]); //eslint-disable-line

  return (
    <div className="rounded-t-3xl w-full bg-white flex flex-col items-center relative">
      {step > 0 && (
        <ArrowLeft
          size={32}
          className="absolute top-0 ml-4 mt-4 self-start"
          onClick={() => step > 0 && setStep(step - 1)}
        />
      )}
      <h2 className="font-semibold mt-4 text-primary text-xl">
        {getStepTitle()}
      </h2>
      <div className="w-full px-4 py-6 flex flex-col justify-between items-center">
        {isPending ? <LoadingSpinner /> : renderStepContent()}
      </div>
    </div>
  );
};

export default BottomLogin;
