import { HStack, useRadioGroup } from "@chakra-ui/react";
import {
  GetAvailableDevices,
  SetMainDevice,
} from "../../../../api/services/EstablishmentService";
import RadioDevice from "./RadioDevice";
import { DeviceType } from "../../@types/DevicesType";
import { Monitor, Smartphone, Speaker } from "react-feather";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";

type Props = {
  deviceId: string;
};

const RadioGroupDevices = ({ deviceId }: Props) => {
  const { data, isLoading, isError } = GetAvailableDevices();
  const { mutate } = SetMainDevice();

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "devices",
    defaultValue: deviceId,
    onChange: mutate,
  });

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <div>não foi possível carregar este componente</div>;

  const icons: any = {
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
              <p className="max-w-20 text-center">{device.name}</p>
              {icons[device.type.toLowerCase()]}
            </div>
          </RadioDevice>
        );
      })}
    </HStack>
  );
};

export default RadioGroupDevices;
