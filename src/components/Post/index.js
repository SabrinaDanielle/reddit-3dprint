import React, { useContext, useEffect, useState } from "react";
import Axios from "axios";
import Article from "./Article";
import Comments from "./Comments";
import Loading from "../Loading";
import { AppContext } from "../../store";

const Post = () => {
  const [state, dispatch] = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const { postUrl, viewPost } = state;

  useEffect(() => {
    if (isLoading) {
      Axios.get(`${postUrl}`)
        .then((response) => {
          const post = response.data;
          dispatch({ type: "VIEW_POST", payload: post });
        })
        .catch((err) => {
          dispatch({ type: "SET_ERROR", payload: err });
        });
    }
    if (viewPost[0] && viewPost[1] !== undefined) {
      setIsLoading(false);
    }

    return () => {
      Axios.Cancel();
    };
  }, [dispatch, isLoading, postUrl, viewPost]);
  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <Article className="content" article={viewPost[0]} />
      <Comments className="section" comments={viewPost[1]} />
    </div>
  );
};

export default Post;
