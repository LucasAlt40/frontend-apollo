import { useState } from "react";

interface GenreCardProp {
  name: string;
  votes: number;
  totalVotes: number;
  handleSelect: (genre: string) => void;
  disabled: boolean;
}

const GenreCard = ({
  name,
  votes,
  totalVotes,
  handleSelect,
  disabled,
}: GenreCardProp) => {
  const [selected, setSelected] = useState(false);
  const percentVotes = totalVotes > 0 ? (votes / totalVotes) * 100 : 0;

  const handleClick = () => {
    if (!disabled) {
      setSelected(!selected);
      handleSelect(name);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col border p-6 rounded-md justify-between  ${
        selected
          ? "bg-primary text-white"
          : "bg-[#f9f9f9] text-primary border-[#d9d9d9]"
      } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
    >
      <h3 className="font-bold capitalize text-lg">{name}</h3>
      <p className="capitalize self-end">({percentVotes.toFixed(1)}%)</p>
    </div>
  );
};

export default GenreCard;
