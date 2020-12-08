import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Footer from "./Footer";
import { AppContext } from "../../store";
import Loading from "../Loading";

const Layout = (props) => {
  const { children } = props;
  const [state] = useContext(AppContext);
  const { isLoading } = state;

  useEffect(() => {}, [isLoading]);

  return (
    <div>
      <Header />
      <main className="app-container">
        {isLoading ? <Loading /> : children}
      </main>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Layout;
