import { useContext } from "react";
import { Navigate } from "react-router-dom";

import { UserContext } from "../../core/context/Context.jsx";

const FallbackRedirect = () => {
  const { isAuth } = useContext(UserContext);
  const target = isAuth ? "/topics" : "/";

  return <Navigate to={target} replace />;
};

export default FallbackRedirect;
