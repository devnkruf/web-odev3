// Reducer actions
export const FETCH_INIT = 'FETCH_INIT';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';
export const SET_QUERY = 'SET_QUERY';
export const SET_FILTERS = 'SET_FILTERS';
export const SET_WATCHLIST = 'SET_WATCHLIST';
export const SET_PAGE_SIZE = 'SET_PAGE_SIZE';
export const ADD_WATCHLIST = 'ADD_WATCHLIST';
export const REMOVE_WATCHLIST = 'REMOVE_WATCHLIST';
export const CLEAR_WATCHLIST = 'CLEAR_WATCHLIST';
export const SET_PAGE = 'SET_PAGE';

// Load watchlist from localStorage
const loadWatchlist = () => {
  try {
    const saved = localStorage.getItem('watchlist');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    return [];
  }
};

// Initial state
export const initialState = {
  isLoading: false,
  isError: false,
  data: [],
  query: '',
  defaultQuery: 'steins gate',
  filters: {
    genre: '',
    language: '',
    minRating: 0
  },
  watchlist: [],
  pageSize: 6,
  currentPage: 1
};

// Initialize state with localStorage
export const initializeState = (initialState) => {
  return {
    ...initialState,
    watchlist: loadWatchlist()
  };
};

// Reducer function
export const appReducer = (state, action) => {
  switch (action.type) {
    case FETCH_INIT:
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    
    case FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
        currentPage: 1
      };
    
    case FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    
    case SET_QUERY:
      return {
        ...state,
        query: action.payload
      };
    
    case SET_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload
        },
        currentPage: 1
      };
    
    case SET_WATCHLIST:
      return {
        ...state,
        watchlist: action.payload
      };
    
    case SET_PAGE_SIZE:
      return {
        ...state,
        pageSize: action.payload,
        currentPage: 1
      };
    
    case ADD_WATCHLIST:
      if (state.watchlist.some(item => item.id === action.payload.id)) {
        return state;
      }
      const newWatchlist = [...state.watchlist, action.payload];
      localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
      return {
        ...state,
        watchlist: newWatchlist
      };
    
    case REMOVE_WATCHLIST:
      const filteredWatchlist = state.watchlist.filter(item => item.id !== action.payload);
      localStorage.setItem('watchlist', JSON.stringify(filteredWatchlist));
      return {
        ...state,
        watchlist: filteredWatchlist
      };
    
    case CLEAR_WATCHLIST:
      localStorage.setItem('watchlist', JSON.stringify([]));
      return {
        ...state,
        watchlist: []
      };
    
    case SET_PAGE:
      return {
        ...state,
        currentPage: action.payload
      };
    
    default:
      return state;
  }
};
