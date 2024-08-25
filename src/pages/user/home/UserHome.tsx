import { useState } from "react";
import { getDecodedAccessToken, mapTokenToUser } from "../../../utils";

import { MapPin, Users } from "react-feather";
import { UserType } from "../../../@types/UserType";
import { Skeleton, Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getInfo } from "../../../api/services/EstablishmentService";

const UserHome = () => {
  const [user] = useState<UserType>(mapTokenToUser(getDecodedAccessToken()));

  const { data, isLoading, isError } = useQuery({
    queryKey: ["establishmentUserInfo", user.establishmentId],
    refetchOnWindowFocus: false,
    queryFn: () => getInfo(user.establishmentId),
  });

  return (
    <>
      <div className="flex justify-between items-center mb-5 ">
        <p className="font-bold">{user.username}</p>
      </div>

      {isLoading && <Skeleton width="100%" height="700px"></Skeleton>}

      {!isLoading && !isError && (
        <div className="flex justify-center items-center flex-col p-4 rounded h-[700xp] bg-primary text-white">
          <img
            src="https://media-cdn.tripadvisor.com/media/photo-s/19/e8/5e/5f/wave-bar.jpg"
            alt="zinho foto"
          />
          <div className="flex justify-center items-center flex-col ">
            <p>Você está em</p>
            <h1 className="flex">
              <MapPin />
              {data?.data?.name}
            </h1>
          </div>
          <div className="w-full flex">
            <Tag size="md">Tocando Agora</Tag>
            <Tag size="md">
              <TagLabel>{data?.data?.totalUsers}</TagLabel>
              <TagLeftIcon>
                <Users />
              </TagLeftIcon>
            </Tag>
          </div>
        </div>
      )}
    </>
  );
};

export default UserHome;
