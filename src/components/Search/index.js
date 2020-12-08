import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";
import { AppContext } from "../../store";

const Search = (props) => {
  // const { listType } = props;
  const { activeList, setActiveList } = props;
  const [state, dispatch] = useContext(AppContext);
  const [searchFor, setSearchFor] = useState("");
  const [searchRedirect, setSearchRedirect] = useState(false);
  const [results, setResults] = useState([]);
  const [numOfPosts, setNums] = useState(0);

  const { isLoading, searchQuery } = state;

  useEffect(() => {
    // if (results.length > 0) {
    //   dispatch({ type: "SET_SEARCH_RESULTS", payload: results });
    // }
  }, [dispatch, isLoading, results]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: "SET_LOADING", payload: true });

    const handleList = () => {
      const filterdList = activeList.flatMap((post) => {
        const { data } = post;
        const { author, title, selftext } = data;

        const lowerAuthor = _.toLower(author);
        const lowerTitle = _.toLower(title);
        const lowerSelftext = _.toLower(selftext);
        const lowerSearchFor = _.toLower(searchFor);

        dispatch({ type: "SET_SEARCH", payload: lowerSearchFor });

        const inAuthor = lowerAuthor.search(lowerSearchFor);
        const inTitle = lowerTitle.search(lowerSearchFor);
        const inSelfText = lowerSelftext.search(lowerSearchFor);

        if (inAuthor > -1 || inTitle > -1 || inSelfText > -1) {
          return post;
        }
        return null;
      });

      const searchResults = _.pullAll(filterdList, [undefined, null]);
      dispatch({ type: "SET_SEARCH_RESULTS", payload: searchResults });
      setActiveList(searchResults);
      setNums(searchResults.length);
      dispatch({ type: "SET_LOADING", payload: false });
      setSearchRedirect(true);
    };
    setResults(handleList());
  };

  const handleChange = (event) => {
    setSearchFor(event.target.value);
  };

  return searchRedirect && results ? (
    <Redirect
      to={{
        pathname: `/search/${searchQuery}`,
      }}
    />
  ) : (
    <div className="block search">
      {searchRedirect && (
        <>
          {" "}
          <h3 className="subtitle">#of posts {numOfPosts} </h3>
          <h4 className="subtitle">Results</h4>
        </>
      )}
      <form className="container" onSubmit={handleSubmit}>
        <p className="control has-icons-left">
          <input
            id="search"
            value={searchFor}
            onChange={handleChange}
            className="input is-rounded is-primary is-large"
            type="text"
            placeholder="Search"
          />
          <span className="icon is-left">
            {" "}
            <FontAwesomeIcon
              className="search_icon"
              size="lg"
              icon={faSearch}
            />
          </span>
        </p>
        {/* <input display="hidden" type="submit" /> */}
      </form>
    </div>
  );
};

Search.propTypes = {
  activeList: PropTypes.arrayOf(PropTypes.object).isRequired,
  // listType: PropTypes.string.isRequired,
  setActiveList: PropTypes.func.isRequired,
};

export default Search;
