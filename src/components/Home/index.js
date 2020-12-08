import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import _ from "lodash";
import { AppContext } from "../../store";
import PostList from "../PostList";

const Home = () => {
  const [state] = useContext(AppContext);
  const [listType, setListType] = useState("Posts");
  const [activeList, setActiveList] = useState(state.posts);

  const [posts, setPosts] = useState();
  const [newPosts, setNewPosts] = useState();
  const [topPosts, setTopPosts] = useState();
  const [hotPosts, setHotPosts] = useState();
  // const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const sanitizeLocation = _.trimStart(location.pathname, `/`);

  useEffect(() => {
    if (state.isLoading === false) {
      setPosts(state.posts);
      setNewPosts(state.newPosts);
      setTopPosts(state.topPosts);
      setHotPosts(state.hotPosts);
    }
    switch (sanitizeLocation) {
      case "Posts":
        setActiveList(posts);
        break;
      case "New":
        setActiveList(newPosts);
        break;
      case "Top":
        setActiveList(topPosts);
        break;
      case "Hot":
        setActiveList(hotPosts);
        break;
      default:
        setActiveList(posts);
        break;
    }
    setListType(sanitizeLocation);
  }, [
    state.posts,
    state.newPosts,
    state.topPosts,
    state.hotPosts,
    state.isLoading,
    sanitizeLocation,
    posts,
    newPosts,
    topPosts,
    hotPosts,
  ]);

  const listNames = ["Posts", "New", "Hot", "Top"];

  return (
    <div>
      <div className="space"> </div>
      <div className="tabs  is-toggle is-fullwidth is-large">
        <ul>
          {listNames.map((listName) => {
            const isActive =
              sanitizeLocation === listName ? "is-active" : "inactive-tab";
            const defaultListActive =
              sanitizeLocation === "/" && listName === "Posts"
                ? "is-active"
                : isActive;
            return (
              <>
                <li key={listName} className={defaultListActive}>
                  <Link to={`/${listName}`}>{listName}</Link>
                </li>
              </>
            );
          })}
        </ul>
      </div>
      <PostList
        setActiveList={setActiveList}
        activeList={activeList}
        listType={listType}
      />
    </div>
  );
};
export default Home;
