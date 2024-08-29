const Header = ({ variant }: { variant: "rose" | "white" }) => {
  return (
    <header
      className={`fixed top-0 w-full ${
        variant == "rose" ? "bg-white" : "bg-primary"
      } z-10 py-1`}
    >
      <div className="text-center">
        <span
          className={`${
            variant == "rose" ? "text-primary" : "text-white"
          } uppercase font-bold text-center`}
        >
          Apollo Music
        </span>
      </div>
    </header>
  );
};

export default Header;
