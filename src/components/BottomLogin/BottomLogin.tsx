import { Shield, User } from "react-feather";

import apiCommonInstance from "../../api/apiCommonInstance";

import style from "./index.module.css";
import React, { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";

interface BottomLoginProps {
  children?: React.ReactNode;
}

const BottomLogin: React.FC<BottomLoginProps> = ({ ...props }) => {
  const [title, setTitle] = useState("Quem é você?");
  const [step, setStep] = useState(0);

  const steps = [
    <>
      <Button colorScheme="red" variant="outline" rightIcon={<Shield />}>
        Proprietário
      </Button>

      <Button colorScheme="red" rightIcon={<User />}>
        Usuário
      </Button>
    </>,
    <></>,
  ];

  const getData = async () => {
    const data = await apiCommonInstance.post("auth/owner", {
      email: "zinho@gmail.com",
      password: "123",
      establishmentId: 1,
    });

    console.log(data.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={style.loginForm}>
      <p>{title}</p>
      {steps[step]}
    </div>
  );
};

export default BottomLogin;
