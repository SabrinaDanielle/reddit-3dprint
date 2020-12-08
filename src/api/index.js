import Axios from "axios";

const GetAllPosts = async (dispatch) => {
  const errorMessage = {
    message: "There was an error loading the posts, please try again",
  };

  await Axios.get("https://www.reddit.com/r/3Dprinting.json")
    .then((response) => {
      const listing = response.data;
      return listing;
    })
    .then((listing) => {
      dispatch({ type: "GET_POSTS", payload: listing.data.children });
    })
    .catch(() => {
      dispatch({ type: "SET_ERROR", payload: [errorMessage] });
    });

  await Axios.get("https://www.reddit.com/r/3Dprinting/hot.json")
    .then((response) => {
      const listing = response.data;
      return listing;
    })
    .then((listing) => {
      dispatch({ type: "GET_HOT_POSTS", payload: listing.data.children });
    })
    .catch(() => {
      dispatch({ type: "SET_ERROR", payload: [errorMessage] });
    });

  await Axios.get("https://www.reddit.com/r/3Dprinting/new.json")
    .then((response) => {
      const listing = response.data;
      return listing;
    })
    .then((listing) => {
      dispatch({ type: "GET_NEW_POSTS", payload: listing.data.children });
    })
    .catch(() => {
      dispatch({ type: "SET_ERROR", payload: [errorMessage] });
    });

  await Axios.get("https://www.reddit.com/r/3Dprinting/top.json")
    .then((response) => {
      const listing = response.data;
      return listing;
    })
    .then((listing) => {
      dispatch({ type: "GET_TOP_POSTS", payload: listing.data.children });
    })
    .catch(() => {
      dispatch({ type: "SET_ERROR", payload: [errorMessage] });
    });

  dispatch({ type: "SET_LOADING", payload: false });

  return Axios.Cancel();
};

export default GetAllPosts;
