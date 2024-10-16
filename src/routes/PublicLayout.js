import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const PublicLayouts = () => {
  const navigate = useNavigate();
  const [isRender, setIsRender] = useState(false);
  const isLoggedIn = Cookies.get('token');

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      setIsRender(true);
    }
  }, [isLoggedIn, navigate]);

  if (!isRender) {
    return null;
  }

  return <Outlet />;
};

export default PublicLayouts;

