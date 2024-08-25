import { useEffect, useState } from "react";
import { MapPin } from "react-feather";
import apiCommonInstance from "../../../api/apiCommonInstance";

const UserHome = () => {
  const [establishment, setEstablishment] = useState();

  const getData = async () => {
    const response = await apiCommonInstance.get("/establishment/1");

    if (response.data) {
      setEstablishment(response.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center mb-5 ">
        <p className="font-bold">Lucas</p>
      </div>

      <div className="flex justify-center items-center flex-col p-4 rounded w-[50%] h-[500xp] bg-primary text-white">
        <img
          src="https://media-cdn.tripadvisor.com/media/photo-s/19/e8/5e/5f/wave-bar.jpg"
          alt="zinho foto"
        />
        <div className="flex justify-center items-center flex-col ">
          <p>Você está em</p>
          <h1>
            <MapPin />
            {establishment?.name}
          </h1>
        </div>
      </div>
    </>
  );
};

export default UserHome;
