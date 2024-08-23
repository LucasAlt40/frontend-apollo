import { PlaylistType } from "./PlaylistType";

export type EstablishmentType = {
  id: number;
  name: string;
  deviceId: string;
  isOff: boolean;
  playlist: PlaylistType;
};
