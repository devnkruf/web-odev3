import React from 'react';
import './WatchlistPanel.css';

const WatchlistPanel = ({ watchlist, onRemoveFromWatchlist, onClearWatchlist }) => {
  return (
    <div className="watchlist-panel">
      <div className="watchlist-header">
        <h2>Gösterime Girecekler ({watchlist.length})</h2>
      </div>
      
      <div className="watchlist-content">
        {watchlist.length === 0 ? (
          <>
            <p className="watchlist-empty">Listeye eklenmiş yapım yok.</p>
            <button className="watchlist-clear" disabled>
              Listeyi Temizle
            </button>
          </>
        ) : (
          <div className="watchlist-items">
            {watchlist.map((show) => (
              <div key={show.id} className="watchlist-item">
                <div className="watchlist-item-image">
                  {show.image?.medium ? (
                    <img src={show.image.medium} alt={show.name} />
                  ) : (
                    <div className="no-image">Poster Yok</div>
                  )}
                </div>
                <div className="watchlist-item-info">
                  <h4>{show.name}</h4>
                  <p className="watchlist-item-rating">
                    ⭐ {show.rating?.average || '-'}
                  </p>
                </div>
                <button
                  onClick={() => onRemoveFromWatchlist(show.id)}
                  className="watchlist-remove-btn"
                >
                  Kaldır
                </button>
              </div>
            ))}
            <button className="watchlist-clear" onClick={onClearWatchlist}>
              Listeyi Temizle
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchlistPanel;
