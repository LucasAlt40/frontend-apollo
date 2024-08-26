import { HStack, useRadioGroup } from "@chakra-ui/react";
import {
  getAvailableDevices,
  setMainDevice,
} from "../../../../api/services/EstablishmentService";
import { useQuery } from "@tanstack/react-query";
import RadioDevice from "./RadioDevice";
import { DeviceType } from "../../@types/DevicesType";
import { Monitor, Smartphone, Speaker } from "react-feather";

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

  const icons = {
    computer: <Monitor size={20} />,
    smartphone: <Smartphone size={20} />,
    speaker: <Speaker size={20} />,
  };

  return (
    <HStack {...getRootProps()}>
      {data?.data.devices.map((device: DeviceType) => {
        const radio = getRadioProps({ value: device.id });
        return (
          <RadioDevice key={device.id} {...radio}>
            <div className="flex flex-col items-center">
              <p>{device.name}</p>
              {icons[device.type.toLowerCase()]}
            </div>
          </RadioDevice>
        );
      })}
    </HStack>
  );
};

export default RadioGroupDevices;
