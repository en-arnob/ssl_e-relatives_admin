import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
// import Spinner from "../../Components/Other/Spinner/Spinner";
import { UserContext } from "../../Context/UserContextAPI";

const PrivateRouter = ({ children,props }) => {
  const { currentUser, modulePerm, loading} = useContext(UserContext);
  console.log(props);

  const location = useLocation();
  if(loading){
    return <div>loading...</div>
  }

  if (currentUser && modulePerm(props)=== true) {
   
    return children;
  } 
  else {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
};

export default PrivateRouter;
