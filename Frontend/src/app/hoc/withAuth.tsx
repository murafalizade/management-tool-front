import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import Cookie from "../utility/Cookie";

const withAuth = (Component: React.FunctionComponent) => {
  const ComponenetWithAuth = () => {
    let nav = useNavigate();
    useEffect(() => {
      const token = Cookie.getCookie(process.env.REACT_APP_SECRET_TOKEN_KEY!);
      if (!token) {
        nav("/login");
      }
    }, []);

    return <Component />;
  };

  return ComponenetWithAuth;
};

export default withAuth;
