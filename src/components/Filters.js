import React from 'react';
import './Filters.css';

const Filters = ({ filters, onFilterChange }) => {
  const handleGenreChange = (e) => {
    onFilterChange({ genre: e.target.value });
  };

  const handleLanguageChange = (e) => {
    onFilterChange({ language: e.target.value });
  };

  const handleRatingChange = (e) => {
    onFilterChange({ minRating: parseFloat(e.target.value) || 0 });
  };

  return (
    <div className="filters">
      <div className="filter-group">
        <label htmlFor="genre">Tür (hepsi)</label>
        <select
          id="genre"
          value={filters.genre}
          onChange={handleGenreChange}
          className="filter-select"
        >
          <option value="">Tür (hepsi)</option>
          <option value="Drama">Drama</option>
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
          <option value="Science-Fiction">Science-Fiction</option>
          <option value="Thriller">Thriller</option>
          <option value="Crime">Crime</option>
          <option value="Adventure">Adventure</option>
          <option value="Anime">Anime</option>
          <option value="Fantasy">Fantasy</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="language">Dil (hepsi)</label>
        <select
          id="language"
          value={filters.language}
          onChange={handleLanguageChange}
          className="filter-select"
        >
          <option value="">Dil (hepsi)</option>
          <option value="English">English</option>
          <option value="Japanese">Japanese</option>
          <option value="Korean">Korean</option>
          <option value="Spanish">Spanish</option>
          <option value="Turkish">Turkish</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="rating">Min. Puan (0+)</label>
        <select
          id="rating"
          value={filters.minRating}
          onChange={handleRatingChange}
          className="filter-select"
        >
          <option value="0">Min. Puan (0+)</option>
          <option value="5">5+</option>
          <option value="6">6+</option>
          <option value="7">7+</option>
          <option value="8">8+</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
