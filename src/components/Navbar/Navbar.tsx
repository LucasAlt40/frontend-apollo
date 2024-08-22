import { Grid, Home, Music } from "react-feather";
import style from "./navbar.module.css";

const Navbar = () => {
  return (
    <nav className={style.nav}>
      <div className={style.content}>
        <a className={style.a} href="#">
          <Grid />
        </a>
        <a className={style.a} href="/establishment">
          <Home />
        </a>
        <a className={style.a} href="#">
          <Music />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
