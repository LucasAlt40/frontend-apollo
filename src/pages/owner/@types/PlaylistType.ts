export type PlaylistType = {
  id: string;
  name: string;
  description: string;
  images: Image[];
  initialGenres: string[];
  blockedGenres: string[];
  genres: Map<string, number>;
  hasIncrementedGenre: boolean;
};

type Image = {
  url: string;
  height: number;
  widht: number;
};
