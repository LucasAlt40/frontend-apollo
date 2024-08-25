import { useEffect, useState } from "react";
import { getDecodedAccessToken, mapTokenToUser } from "../../../utils";
import apiCommonInstance from "../../../api/apiCommonInstance";

import { MapPin, Users } from "react-feather";
import { UserType } from "../../../@types/UserType";
import { EstablishmentUserType } from "../../../@types/EstablishmentUserType";
import { Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react";

const UserHome = () => {
  const [establishment, setEstablishment] = useState<EstablishmentUserType>(
    {} as EstablishmentUserType
  );
  const [user, setUser] = useState<UserType>({} as UserType);

  const getData = async () => {
    const response = await apiCommonInstance.get(
      `/establishment/${user.establishmentId}`
    );

    if (response.data) {
      setEstablishment(response.data);
    }
  };

  useEffect(() => {
    setUser(mapTokenToUser(getDecodedAccessToken()));
    if (user.establishmentId) {
      getData();
    }
  }, []); //eslint-disable-line

  return (
    <>
      <div className="flex justify-between items-center mb-5 ">
        <p className="font-bold">{user.username}</p>
      </div>

      <div className="flex justify-center items-center flex-col p-4 rounded h-[700xp] bg-primary text-white">
        <img
          src="https://media-cdn.tripadvisor.com/media/photo-s/19/e8/5e/5f/wave-bar.jpg"
          alt="zinho foto"
        />
        <div className="flex justify-center items-center flex-col ">
          <p>Você está em</p>
          <h1 className="flex">
            <MapPin />
            {establishment.name}
          </h1>
        </div>
        <div className="w-full flex">
          <Tag size="md">Tocando Agora</Tag>
          <Tag size="md">
            <TagLabel>{establishment.totalUsers}</TagLabel>
            <TagLeftIcon>
              <Users />
            </TagLeftIcon>
          </Tag>
        </div>
      </div>
    </>
  );
};

export default UserHome;
