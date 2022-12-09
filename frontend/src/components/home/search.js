import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  searchCocktailsApi,
  searchByIngredientApi,
} from "../../actions/api-actions";

const Search = ({ searchStr = "", cocktailSearch = true, profile = {} }) => {
  const [searchString, setSearchString] = useState(searchStr);
  const [searchCocktails, setSearchCocktails] = useState(cocktailSearch);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = () => {
    let searchQuery;
    if (searchCocktails) {
      searchQuery = `s=${searchString}`;
      searchCocktailsApi(dispatch, searchQuery)
        .then((results) => navigate(`/results?${searchQuery}`))
        .catch((e) => alert(e));
    } else {
      searchQuery = `i=${searchString}`;
      searchByIngredientApi(dispatch, searchQuery)
        .then((results) => navigate(`/results?${searchQuery}`))
        .catch((e) => alert(e));
    }
  };

  return (
    <div>
      <div className="input-group w-50 mx-auto mb-2">
        <input
          className="form-control form-control-lg"
          placeholder={
            searchCocktails ? "Search Drinks" : "Search by Ingredient"
          }
          value={searchString}
          onChange={(e) => {
            setSearchString(e.target.value);
          }}
        />
        <div className="input-group-lg input-group-append">
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      <div
        className="input-group w-50 mx-auto text-center"
        onChange={(e) => {
          setSearchCocktails(e.target.value === "cocktail");
        }}
      >
      </div>
    </div>
  );
};

export default Search;
