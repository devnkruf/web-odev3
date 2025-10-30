import React, { useReducer, useEffect, useCallback } from 'react';
import axios from 'axios';
import SearchBox from '../components/SearchBox';
import Filters from '../components/Filters';
import TVList from '../components/TVList';
import Pagination from '../components/Pagination';
import WatchlistPanel from '../components/WatchlistPanel';
import { 
  appReducer, 
  initialState,
  FETCH_INIT,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  SET_QUERY,
  SET_FILTERS,
  ADD_WATCHLIST,
  REMOVE_WATCHLIST,
  CLEAR_WATCHLIST,
  SET_PAGE
} from '../reducer';
import './Home.css';

const Home = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const fetchShows = useCallback(async (searchQuery) => {
    dispatch({ type: FETCH_INIT });
    
    try {
      const response = await axios.get(
        `https://api.tvmaze.com/search/shows?q=${searchQuery}`
      );
      dispatch({ type: FETCH_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_FAILURE });
    }
  }, []);

  useEffect(() => {
    // Eğer query boşsa defaultQuery kullan
    const searchQuery = state.query || state.defaultQuery;
    fetchShows(searchQuery);
  }, [state.query, state.defaultQuery, fetchShows]);

  const handleSearch = (query) => {
    dispatch({ type: SET_QUERY, payload: query });
  };

  const handleFilterChange = (filters) => {
    dispatch({ type: SET_FILTERS, payload: filters });
  };

  const handleAddToWatchlist = (show) => {
    dispatch({ type: ADD_WATCHLIST, payload: show });
  };

  const handleRemoveFromWatchlist = (showId) => {
    dispatch({ type: REMOVE_WATCHLIST, payload: showId });
  };

  const handleClearWatchlist = () => {
    dispatch({ type: CLEAR_WATCHLIST });
  };

  const handlePageChange = (page) => {
    dispatch({ type: SET_PAGE, payload: page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetry = () => {
    fetchShows(state.query);
  };

  // Apply filters
  const getFilteredShows = () => {
    return state.data.filter((item) => {
      const show = item.show;
      
      // Genre filter
      if (state.filters.genre && !show.genres?.includes(state.filters.genre)) {
        return false;
      }
      
      // Language filter
      if (state.filters.language && show.language !== state.filters.language) {
        return false;
      }
      
      // Rating filter
      if (state.filters.minRating > 0) {
        const rating = show.rating?.average || 0;
        if (rating < state.filters.minRating) {
          return false;
        }
      }
      
      return true;
    });
  };

  const filteredShows = getFilteredShows();
  
  // Pagination
  const totalPages = Math.ceil(filteredShows.length / state.pageSize);
  const startIndex = (state.currentPage - 1) * state.pageSize;
  const endIndex = startIndex + state.pageSize;
  const currentShows = filteredShows.slice(startIndex, endIndex);

  return (
    <div className="home">
      <header className="header">
        <div className="header-content">
          <h1><a href="/" className="header-title">🎬 Kampüs Film Kulübü</a></h1>
          <a href="/" className="home-link">Ana Sayfa</a>
        </div>
      </header>

      <div className="main-container">
        <div className="content-area">
          <div className="search-filters-section">
            <SearchBox query={state.query} onSearch={handleSearch} />
            <Filters filters={state.filters} onFilterChange={handleFilterChange} />
          </div>

          {state.isLoading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Yükleniyor...</p>
            </div>
          ) : state.isError ? (
            <div className="error">
              <h2>Bir hata oluştu!</h2>
              <p>Veriler yüklenirken bir sorun oluştu.</p>
              <button onClick={handleRetry} className="retry-button">
                Tekrar Dene
              </button>
            </div>
          ) : filteredShows.length === 0 ? (
            <div className="empty-state">
              <h2>Sonuç bulunamadı</h2>
              <p>Arama kriterlerinize uygun dizi bulunamadı.</p>
            </div>
          ) : (
            <>
              <TVList
                shows={currentShows}
                onAddToWatchlist={handleAddToWatchlist}
                watchlist={state.watchlist}
              />
              
              <Pagination
                currentPage={state.currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>

        <WatchlistPanel
          watchlist={state.watchlist}
          onRemoveFromWatchlist={handleRemoveFromWatchlist}
          onClearWatchlist={handleClearWatchlist}
        />
      </div>
    </div>
  );
};

export default Home;
