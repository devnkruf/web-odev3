import React from 'react';
import TVCard from './TVCard';
import './TVList.css';

const TVList = ({ shows, onAddToWatchlist, watchlist }) => {
  const isInWatchlist = (showId) => {
    return watchlist.some(item => item.id === showId);
  };

  return (
    <div className="tv-list">
      {shows.map((item) => (
        <TVCard
          key={item.show.id}
          show={item.show}
          onAddToWatchlist={onAddToWatchlist}
          isInWatchlist={isInWatchlist(item.show.id)}
        />
      ))}
    </div>
  );
};

export default TVList;
