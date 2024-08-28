import { useEffect, useState } from "react";
import { getDecodedAccessToken, mapTokenToUser } from "../../../utils";
import { MapPin, Users } from "react-feather";
import { UserType } from "../../../@types/UserType";
import { Skeleton, Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react";
import { GetEstablishmentById } from "../../../api/services/EstablishmentService";
import DrawerAccount from "./components/DrawerAccount";
import defaultImage from "../../../assets/images/default-establishment.jpg";
import SimpleCard from "../../../components/SimpleCard/SimpleCard";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [user] = useState<UserType>(mapTokenToUser(getDecodedAccessToken()));

  const { data, isLoading, isError } = GetEstablishmentById(
    user.establishmentId
  );

  useEffect(() => {
    if (!user.username) {
      navigate("/owner");
    }
  }, []); //eslint-disable-line

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <p className="font-bold">{user.username}</p>
        <DrawerAccount user={user} />
      </div>

      {isLoading && <Skeleton width="100%" height="500px"></Skeleton>}

      {!isLoading && !isError && (
        <div className="flex justify-center items-center flex-col p-6 gap-4 rounded-lg bg-gradient-to-b from-primary via-mediumRose to-darkRose text-white mb-5">
          <img
            className="rounded-lg"
            src={defaultImage}
            alt={`Imagem de ${data?.data.name}`}
          />
          <div className="flex justify-center items-center flex-col">
            <span className="font-medium text-sm">Você está em</span>
            <h1 className="flex items-center gap-2 font-bold text-3xl">
              <MapPin />
              {data?.data.name}
            </h1>
          </div>
          <div className="w-full flex justify-center gap-2">
            <Tag
              size="lg"
              textColor="var(--color-rose)"
              borderRadius={100}
              fontSize={12}
            >
              Tocando Agora
            </Tag>
            <Tag
              size="lg"
              textColor="var(--color-rose)"
              borderRadius={100}
              fontSize={12}
            >
              <TagLeftIcon>
                <Users />
              </TagLeftIcon>
              <TagLabel>{data?.data.totalUsers}</TagLabel>
            </Tag>
          </div>
        </div>
      )}

      <SimpleCard
        title="Gêneros escolhidos"
        description="Esses são seus gostos musicais definidos."
      >
        <div className="flex flex-wrap gap-2">
          {user.genres.map((genre) => (
            <div
              key={genre}
              className="w-fit flex items-center gap-2 bg-white px-4 py-2 rounded-lg"
            >
              <p>{genre}</p>
            </div>
          ))}
        </div>
      </SimpleCard>
    </>
  );
};

export default Home;
