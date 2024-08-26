import { Box, useRadio } from "@chakra-ui/react";

const RadioDevice = (props) => {
  const { getInputProps, getRadioProps } = useRadio(props);

  return (
    <Box as="label">
      <input {...getInputProps({})} hidden />
      <Box
        {...getRadioProps()}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "red.500",
          color: "white",
          borderColor: "red.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
};

export default RadioDevice;
