export type TokenDataType = {
  establishmentId: string | number;
  sub?: string;
  genres?: Array<string>;
  ownerId?: string | number;
  email?: string;
  scope?: Array<string>;
  exp?: number
};