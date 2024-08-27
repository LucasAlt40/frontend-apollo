import style from "./index.module.css";
import BottomLogin from "../../components/BottomLogin/BottomLogin";
import { getDecodedAccessToken } from "../../utils";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const tokenData = getDecodedAccessToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (tokenData) {
      if (tokenData?.scope) {
        navigate("/owner");
      } else {
        navigate("/user");
      }
    }
  }, [tokenData]); //eslint-disable-line

  return (
    <>
      <main className={style.container}>
        <div className={style.title}>
          <h1>APOLLO MUSIC</h1>
          <p>Lorem ipsum dolor sit amet consectetur.</p>
        </div>
        <BottomLogin />
      </main>
    </>
  );
};

export default Login;
