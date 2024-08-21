import { Shield, User } from "react-feather";
import CommonButton from "../../components/CommonButton/CommonButton";

import style from "./index.module.css";

const Login = () => {
  return (
    <>
      <main>
        <h1>APOLLO MUSIC</h1>
        <p>Lorem ipsum dolor sit amet consectetur.</p>
      </main>
      <div className={style.loginForm}>
        <p>Quem é você?</p>
        <CommonButton
          onClick={() => console.log("teste")}
          style={{
            background: "#FFF",
            color: "var(--color-rose)",
            border: "1px solid var(--color-rose)",
          }}
        >
          <Shield />
          Proprietário
        </CommonButton>
        <CommonButton onClick={() => console.log("teste")}>
          <User />
          Usuário
        </CommonButton>
      </div>
    </>
  );
};

export default Login;
