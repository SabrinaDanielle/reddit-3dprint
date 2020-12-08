import React, { useContext, useState, useEffect } from "react";
import PostList from "../PostList";
import Loading from "../Loading";
import { AppContext } from "../../store";

const SearchResults = () => {
  const [state] = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState();

  const { SearchResults: resultsList } = state;

  useEffect(() => {
    if (isLoading && results) {
      setIsLoading(false);
    }
    setResults(resultsList);
  }, [isLoading, results, resultsList]);

  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <h2>Results</h2>
      <h3>#of matching post: </h3>
      <PostList
        listType="SearchResults"
        // setActiveList={(e) => }
        activeList={results}
      />
    </div>
  );
};
export default SearchResults;
