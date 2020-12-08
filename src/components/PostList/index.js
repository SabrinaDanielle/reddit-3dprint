/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import _ from "lodash";

import { AppContext } from "../../store";

import Search from "../Search";
// import Loading from "../Loading";

const PostList = (props) => {
  const { activeList, listType, setActiveList } = props;

  const [state, dispatch] = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (activeList === undefined) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [props, dispatch, state, isLoading, activeList]);

  const viewPost = (event, url) => {
    dispatch({
      type: "SET_POST_API",
      payload: `https://www.reddit.com/${url}.json`,
    });
  };

  return (
    <div>
      {activeList && (
        <>
          <Search
            activeList={activeList}
            listType={listType}
            setActiveList={setActiveList}
          />
          {activeList.map((post, index) => {
            const { data } = post;
            const { author, title, created, likes, permalink, id } = data;
            const date = new Date(created * 1000);
            const dateString = date.toLocaleString();
            const url = _.trimEnd(permalink, "/");

            return (
              <Link
                to={`/post/${id}`}
                onClick={(event) => viewPost(event, url)}
                key={`${author}:${created}`}
                className="box post-box"
              >
                <div tabIndex={index} className="box post-box">
                  <div className="container">
                    <h5 className="title is-4">{title}</h5>
                    <p className="subtitle author_post-list">--{author}</p>
                    <p>{dateString}</p>
                    <p>{likes}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </>
      )}
    </div>
  );
};

PostList.propTypes = {
  activeList: PropTypes.arrayOf(PropTypes.object).isRequired,
  listType: PropTypes.string.isRequired,
  setActiveList: PropTypes.func.isRequired,
};

export default React.memo(PostList);
