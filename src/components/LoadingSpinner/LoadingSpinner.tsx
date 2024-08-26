import { Spinner } from "@chakra-ui/react";

const LoadingSpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
    <Spinner size="xl" color="red" />
  </div>
);

export default LoadingSpinner;
