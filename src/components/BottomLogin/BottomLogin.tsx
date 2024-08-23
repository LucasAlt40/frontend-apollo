import { ArrowLeft, Shield, User } from "react-feather";
import style from "./index.module.css";
import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import OwnerLogin from "../OwnerLogin/OwnerLogin";

const BottomLogin: React.FC = () => {
  const [step, setStep] = useState(0);

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
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
    <OwnerLogin />,
  ];

  return (
    <div className={style.loginForm}>
      {step > 0 && (
        <ArrowLeft
          size={32}
          className="absolute top-0 ml-4 mt-4 self-start"
          onClick={handleBack}
        />
      )}
      <p className="mb-4">{step === 1 ? "Proprietário" : "Quem é você?"}</p>
      <div className="flex flex-col justify-between items-center">
        {steps[step]}
      </div>
    </div>
  );
};

export default BottomLogin;
