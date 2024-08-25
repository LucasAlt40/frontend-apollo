import { Select } from "@chakra-ui/react";
import {
  getAvailableDevices,
  setMainDevice,
} from "../../../../api/services/EstablishmentService";
import { useQuery } from "@tanstack/react-query";
import { DeviceType } from "../../@types/DevicesType";

const CardDevices = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["establishmentDevices"],
    refetchOnWindowFocus: false,
    queryFn: () => getAvailableDevices(),
  });

  if (isLoading) return <div>Carregando...</div>;

  if (isError) return <div>não foi possível carregar este componente</div>;

  return (
    <Select
      placeholder="Selecione um dispositivo"
      onChange={(e) => {
        if (e.target.value.length > 0) setMainDevice(e.target.value);
      }}
    >
      {data?.data?.devices.map((device: DeviceType) => (
        <option key={device.id} value={device.id}>
          {device.name}
        </option>
      ))}
    </Select>
  );
};

export default CardDevices;
