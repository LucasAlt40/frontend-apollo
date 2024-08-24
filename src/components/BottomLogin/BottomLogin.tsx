import { useState, ReactNode } from "react";
import { Button } from "@chakra-ui/react";
import { ArrowLeft, Shield, User } from "react-feather";

import style from "./index.module.css";
import OwnerLogin from "../OwnerLogin/OwnerLogin";
import UserLogin from "../UserLogin/UserLogin";

interface User {
  establishmentId: string;
  username: string;
  genres: string;
}

const BottomLogin = () => {
  const [step, setStep] = useState(0);
  const [isOwner, setIsOwner] = useState(false);
  const [user, setUser] = useState<User>({
    establishmentId: "",
    username: "",
    genres: "",
  });

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
    if (step <= 1) {
      setIsOwner(false);
    }
  };

  const handleStepChange = (newStep: number, ownerStatus: boolean) => {
    setIsOwner(ownerStatus);
    setStep(newStep);
  };

  const renderStepContent = (currentStep: number): ReactNode => {
    switch (currentStep) {
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
              className="m-4"
              colorScheme="red"
              rightIcon={<User />}
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
        return <div></div>;
      default:
        return null;
    }
  };

  const getStepTitle = (): string => {
    if (step === 1) return isOwner ? "Proprietário" : "Estabelecimento";
    return "Quem é você?";
  };

  return (
    <div className={style.loginForm}>
      {step > 0 && (
        <ArrowLeft
          size={32}
          className="absolute top-0 ml-4 mt-4 self-start"
          onClick={handleBack}
        />
      )}
      <p className="mb-4">{getStepTitle()}</p>
      <div className="flex flex-col justify-between items-center">
        {renderStepContent(step)}
      </div>
    </div>
  );
};

export default BottomLogin;
