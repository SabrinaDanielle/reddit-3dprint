const Reducer = (state, action) => {
  switch (action.type) {
    case "GET_POSTS":
      return {
        ...state,
        posts: action.payload,
      };
    case "GET_HOT_POSTS":
      return {
        ...state,
        hotPosts: action.payload,
      };
    case "GET_NEW_POSTS":
      return {
        ...state,
        newPosts: action.payload,
      };
    case "GET_TOP_POSTS":
      return {
        ...state,
        topPosts: action.payload,
      };
    case "SET_SEARCH":
      return {
        ...state,
        searchQuery: action.payload,
      };
    case "SET_SEARCH_RESULTS":
      return {
        ...state,
        searchResults: action.payload,
      };
    case "VIEW_POST":
      return {
        ...state,
        viewPost: action.payload,
      };
    case "SET_POST_API":
      return {
        ...state,
        postUrl: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
