import { OwnerType } from "../@types/OwnerType";
import { TokenDataType } from "../@types/TokenDataType";
import { UserType } from "../@types/UserType";

const mapTokenToUser = (tokenData: TokenDataType): UserType => {
  return {
    establishmentId: tokenData.establishmentId.toString(),
    username: tokenData.sub || "",
    genres: tokenData.genres || [],
  };
};

const mapTokenToOwner = (tokenData: TokenDataType): OwnerType => {
  return {
    name: "",
    ownerId: tokenData.ownerId?.toString() || "",
    establishmentId: tokenData.establishmentId.toString(),
    email: tokenData.email || "",
    scope: tokenData.scope || [],
  };
};

export { mapTokenToOwner, mapTokenToUser };
