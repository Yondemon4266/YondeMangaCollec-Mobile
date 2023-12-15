// Exemple: SearchContext.js
import { createContext, useReducer } from "react";

function searchReducer(state, action) {
  switch (action.type) {
    case "SET_IS_ANIME":
      return { ...state, isAnime: action.payload };
    case "SET_SEARCH":
      return { ...state, search: action.payload };
    case "SET_FILTER_OPTIONS":
      return { ...state, filterOptions: action.payload };
    case "SET_PAGE_ANIME":
      return { ...state, pageAnime: action.payload };
    case "SET_PAGE_MANGA":
      return { ...state, pageManga: action.payload };
    case "SET_IS_SEARCH_SUBMIT":
      return { ...state, isSearchSubmit: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_DISPLAYED_DATA":
      return { ...state, displayedData: action.payload };
    default:
      return state;
  }
}

const initialState = {
  isAnime: true,
  search: "",
  filterOptions: {
    isOpen: false,
    mangaGenres: [],
    animeGenres: [],
    studios: [],
    magazines: [],
    animeGenresOpen: true,
    mangaGenresOpen: true,
    studiosOpen: false,
    magazinesOpen: false,
    search: "",
    loading: false,
  },
  pageAnime: 1,
  pageManga: 1,
  isSearchSubmit: false,
  displayedData: {
    animes: [],
    mangas: [],
  },
  loading: false,
};

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  return (
    <SearchContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};

export { SearchProvider, SearchContext };
