import { Grid, Home, Music } from "react-feather";

const Navbar = ({ variant }: { variant: "rose" | "white" }) => {
  return (
    <nav className="fixed bottom-3 w-full z-10 px-4">
      <div
        className={`p-5 ${
          variant == "rose" ? "bg-primary" : "bg-white"
        } rounded-xl flex justify-between ${
          variant == "rose" ? "text-white" : "text-primary"
        } px-4`}
      >
        <a href="#">
          <Grid />
        </a>
        <a href="/owner/home">
          <Home />
        </a>
        <a href="/owner/player">
          <Music />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
