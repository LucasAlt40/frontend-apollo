import { Navigate } from "react-router-dom";
import { ReactElement } from "react";
import { getDecodedAccessToken } from "../utils";

interface ProtectedRouteProps {
  element: ReactElement;
  requiredScope?: string[];
}

const ProtectedRoute = ({ element, requiredScope }: ProtectedRouteProps) => {
  const tokenData = getDecodedAccessToken();

  if (!tokenData || Object.keys(tokenData).length === 0) {
    return <Navigate to="/" replace />;
  }

  if (
    requiredScope &&
    !requiredScope.some((scope) => tokenData.scope?.includes(scope))
  ) {
    return <Navigate to="/user" replace />;
  }

  return element;
};

export default ProtectedRoute;
