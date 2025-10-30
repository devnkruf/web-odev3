import React from 'react';
import './SearchBox.css';

const SearchBox = ({ query, onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(''); // Boş stringe dön (arka planda steins gate aranacak)
  };

  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="search-box">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Dizi ara... (örn: Fullmetal Alchemist, Star Trek)"
          value={query}
          onChange={handleChange}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Sıfırla
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
