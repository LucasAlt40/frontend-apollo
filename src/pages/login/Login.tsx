import style from "./index.module.css";
import BottomLogin from "../../components/BottomLogin/BottomLogin";

const Login = () => {
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
