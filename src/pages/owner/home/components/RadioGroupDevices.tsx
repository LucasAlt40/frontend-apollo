import { HStack, useRadioGroup } from "@chakra-ui/react";
import {
  getAvailableDevices,
  setMainDevice,
} from "../../../../api/services/EstablishmentService";
import { useQuery } from "@tanstack/react-query";
import RadioDevice from "./RadioDevice";
import { DeviceType } from "../../@types/DevicesType";

type Props = {
  deviceId: string;
};

const RadioGroupDevices = ({ deviceId }: Props) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["establishmentDevices"],
    refetchOnWindowFocus: false,
    queryFn: () => getAvailableDevices(),
  });

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "devices",
    defaultValue: deviceId,
    onChange: setMainDevice,
  });

  if (isLoading) return <div>Carregando...</div>;

  if (isError) return <div>não foi possível carregar este componente</div>;

  return (
    <HStack {...getRootProps()}>
      {data?.data.devices.map((device: DeviceType) => {
        const radio = getRadioProps({ value: device.id });
        return (
          <RadioDevice key={device.id} {...radio}>
            <p>{device.name}</p>
            <p>{device.type}</p>
          </RadioDevice>
        );
      })}
    </HStack>
  );
};

export default RadioGroupDevices;
