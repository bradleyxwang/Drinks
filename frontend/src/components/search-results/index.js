import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import Nav from "../home/nav";
import Search from "../home/search";
import DrinkPreview from "./drink-preview";

import { getProfile } from "../../actions/auth-actions";

import {
  searchCocktailsApi,
  searchByIngredientApi,
} from "../../actions/api-actions";

const SearchResults = () => {
  const stateProfile = useSelector((state) => state.auth.profile);
  const [profile, setProfile] = useState(stateProfile);

  const stateResults = useSelector((state) => state.api.results);
  const [results, setResults] = useState(stateResults);

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    async function fetchProfile() {
      await getProfile(dispatch);
    }
    fetchProfile();
  }, [dispatch]);

  useEffect(() => {
    setProfile(stateProfile);
  }, [stateProfile]);

  useEffect(() => {
    if (!results) {
      const searchQuery = location.search.split("?")[1];
      const searchCocktails = searchQuery.startsWith("s");
      if (searchCocktails) {
        searchCocktailsApi(dispatch, searchQuery).catch((e) => alert(e));
      } else {
        searchByIngredientApi(dispatch, searchQuery).catch((e) => alert(e));
      }
    }
  }, [dispatch, results, location.search]);

  useEffect(() => {
    setResults(stateResults);
  }, [stateResults]);

  return (
    <>
      <Nav />
      <div className="container">
        <div className="row">
          <div className="col-12 mt-4">
            <Search
              searchStr={location.search.split("=")[1].replace("%20", " ")}
              cocktailSearch={location.search.startsWith("s", 1)}
              profile={profile}
            />
          </div>
        </div>

        <div className="row mb-1">
          <div className="col-9">
            <h1>Results</h1>
          </div>
          <div className="col-3">
            <div className="h-100 d-flex align-items-end justify-content-end">
              <h6>
              </h6>
            </div>
          </div>
        </div>

        <div className="row">
          {results && results.length > 0 ? (
            results.map((drink) => (
              <DrinkPreview key={drink.id} drink={drink} profile={profile} />
            ))
          ) : (
            <h6>No drinks found :(</h6>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchResults;
