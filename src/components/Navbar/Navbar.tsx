import { Grid, Home, Music } from "react-feather";

const Navbar = () => {
  return (
    <nav className="fixed bottom-3 w-full z-10 px-4">
      <div className="p-5 bg-primary rounded-xl flex justify-between text-white px-4">
        <a href="#">
          <Grid />
        </a>
        <a href="/owner/home">
          <Home />
        </a>
        <a href="#">
          <Music />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
