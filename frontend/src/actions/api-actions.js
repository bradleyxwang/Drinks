import * as api from "../services/api-service";

export const SEARCH_COCKTAILS = "SEARCH_COCKTAILS";
export const SEARCH_BY_INGREDIENT = "SEARCH_BY_INGREDIENT";
export const COCKTAIL_LOOKUP = "COCKTAIL_LOOKUP";

export const searchCocktailsApi = async (dispatch, searchString) => {
  const results = await api.search(searchString);
  dispatch({
    type: SEARCH_COCKTAILS,
    results,
  });
};

export const searchByIngredientApi = async (dispatch, filterString) => {
  const results = await api.filter(filterString);
  let fullResults = [];
  if (results) {
    fullResults = await Promise.all(
      results.drinks.map(
        async (drink) => await api.lookup(`i=${drink.idDrink}`)
      )
    ).then((detailsArray) => detailsArray.map((item) => item.drinks[0]));
  }
  dispatch({
    type: SEARCH_BY_INGREDIENT,
    fullResults,
  });
};

export const cocktailLookup = async (dispatch, lookupString) => {
  const details = await api.lookup(lookupString);
  dispatch({
    type: COCKTAIL_LOOKUP,
    details,
  });
};
