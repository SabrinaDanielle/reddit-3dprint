import React, { useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import Reducer from "./reducer";
import GetAllPosts from "../api";

const AppContext = React.createContext();
const { Provider, Consumer } = AppContext;

const initialState = {
  posts: [],
  newPosts: [],
  hotPosts: [],
  topPosts: [],
  searchQuery: "",
  searchResults: [],
  currentList: "posts",
  viewLists: [],
  viewPost: [],
  postUrl: "",
  isLoading: true,
  error: null,
};

const AppProvider = (props) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  const { children } = props;
  const { isLoading } = state;

  useEffect(() => {
    GetAllPosts(dispatch);
  }, [isLoading]);

  return <Provider value={[state, dispatch]}>{children}</Provider>;
};

AppProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export { AppProvider, Consumer as AppConsumer, AppContext };
