import React, { useState } from "react";
import PropTypes from "prop-types";
import Axios from "axios";

const UserContext = React.createContext();
const { Provider, Consumer } = UserContext;

const UserProvider = (props) => {
  const [user, setUser] = useState({ firstName: "Guest" });
  const { children } = props;

  const handleLogin = (currentUser) => {
    setUser(currentUser);
  };

  const handleLogout = () => {
    Axios.get(`${process.env.API}/logout`)
      .then(() => {
        setUser(null);
      })
      .catch(() => {
        setUser(null);
      });
  };

  return (
    <Provider
      value={{
        user,
        setUser,
        onLogin: handleLogin,
        onLogout: handleLogout,
      }}
    >
      {children}
    </Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export { UserProvider, Consumer as UserConsumer, UserContext };
