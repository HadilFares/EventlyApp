import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const AuthContext = React.createContext(null);

export const AuthProvider = (props) => {
  const { children } = props;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  //state
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);

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
    } else if (userInfo.Roles.Participant) {
      // <Navigate to="/dashboardParticipant" replace={true} />;
    } else if (userInfo.Roles.Organizer) {
      //<Navigate to="/dashboardOrganizer" replace={true} />;
    } /* else navigate("/dashboardExhibitor", { replace: true });*/
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    //appel api decode
    //setUser()
    //setisloading(false)
  }, []);
  const signOut = async () => {
    localStorage.clear();
    navigate("/login");
    setUser(null);
  };

  const value = {
    isLoading,
    signIn,
    signOut,
    open,
    setOpen,
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
