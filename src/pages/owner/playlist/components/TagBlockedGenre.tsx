import { Trash } from "react-feather";
import { UnBlockGenres } from "../../../../api/services/EstablishmentService";

type Props = {
  genre: string;
};

const TagBlockedGenre = ({ genre }: Props) => {
  const { mutate } = UnBlockGenres();
  return (
    <div
      key={genre}
      className="w-fit flex items-center gap-2 bg-white px-4 py-2 rounded-lg"
    >
      <p>{genre}</p>
      <button onClick={() => mutate([genre])}>
        <Trash color="var(--color-rose)" size={18} />
      </button>
    </div>
  );
};

export default TagBlockedGenre;
