import React from "react";
import { Switch, Route } from "react-router-dom";
import { AppProvider } from "./store";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Post from "./components/Post";
import SearchResults from "./components/Search/SearchResults";
import "./App.sass";

const listNames = ["Posts", "New", "Hot", "Top"];

function App() {
  return (
    <AppProvider>
      <Layout>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          {listNames.map((listName) => (
            <Route path={`/${listName}`}>
              <Home />
            </Route>
          ))}
          <Route path="/post/:id">
            <Post />
          </Route>
          <Route path="/search/:query">
            <SearchResults />
          </Route>
        </Switch>
      </Layout>
    </AppProvider>
  );
}

export default App;
