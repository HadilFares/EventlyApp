import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { variables } from "../variables";
export const AuthContext = React.createContext(null);

export const AuthProvider = (props) => {
  const { children } = props;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  //state
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");

  //functions
  const signIn = (userInfo) => {
    //const { user } = params;
    console.log("userInfo", userInfo);
    const { Token, ...rest } = userInfo;
    localStorage.setItem("token", Token);
    console.log(rest);
    setUser(rest);
    if (userInfo.Roles.includes("Admin")) {
      console.log("test");
      return navigate("/admin/users");
    } else if (userInfo.Roles.includes("Organizer")) {
      return navigate("organizer/events");
    } /* else navigate("/dashboardExhibitor", { replace: true });*/
  };

  const config = {
    headers: {
      "access-control-allow-origin": "*",
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const DecodeToken = async () => {
    console.log("Token:", token);
    try {
      const response = await axios.get(
        // `variables.API_URL/Auth/decode?token=${token}`,
        variables.API_URL + `Auth/decode?token=${token}`,
        config
      );
      console.log(response.data);
      const result = response.data;
      console.log("result", result);

      if (result.ISAuthenticated) {
        setUser(result);
        console.log(user);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  };
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    DecodeToken();
    //appel api decode
    //setUser()
    //setisloading(false)
  }, [token]);
  const signOut = async () => {
    localStorage.clear();
    navigate("/login");
    setUser(null);
  };

  const value = {
    isLoading,
    signIn,
    signOut,
    DecodeToken,
    open,
    setOpen,
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
