import { useState, useEffect, ReactNode } from "react";
import { Button, useDisclosure } from "@chakra-ui/react";
import { ArrowLeft, Shield, User } from "react-feather";

import style from "./index.module.css";
import OwnerLogin from "../OwnerLogin/OwnerLogin";
import UserLogin from "../UserLogin/UserLogin";
import DrawerGenres from "../DrawerGenres/DrawerGenres";
import { UserType } from "../@types/UserType";

const BottomLogin = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const handleSubmit = () => {
    console.log(user);
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
            setGenres={setGenres}
            establishmentId={user.establishmentId}
            isOpen={isOpen}
            onClose={handleDrawerClose}
            handleSubmit={handleSubmit}
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
