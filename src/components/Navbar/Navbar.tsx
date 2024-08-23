import { Grid, Home, Music } from "react-feather";

const Navbar = () => {
  return (
    <nav className="fixed bottom-3 w-11/12 left-1/2 -translate-x-1/2 p-5 bg-primary rounded-xl z-10">
      <div className="flex justify-between text-white px-4">
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
