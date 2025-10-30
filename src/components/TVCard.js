import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TVCard.css';

const TVCard = ({ show, onAddToWatchlist, isInWatchlist }) => {
  const navigate = useNavigate();

  const handleDetailClick = () => {
    navigate(`/show/${show.id}`);
  };

  const handleWatchlistClick = () => {
    onAddToWatchlist(show);
  };

  const stripHtml = (html) => {
    if (!html) return 'Özet yok';
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || 'Özet yok';
  };

  const getGenres = () => {
    if (!show.genres || show.genres.length === 0) return [];
    return show.genres;
  };

  const getRating = () => {
    return show.rating?.average || '—';
  };

  return (
    <div className="tv-card">
      <div className="tv-card-image">
        {show.image?.medium ? (
          <img src={show.image.medium} alt={show.name} />
        ) : (
          <div className="no-poster">Poster Yok</div>
        )}
      </div>
      
      <div className="tv-card-content">
        <h3 className="tv-card-title">{show.name}</h3>
        
        <div className="tv-card-meta">
          {getGenres().map((genre, index) => (
            <span key={index} className="genre-badge">{genre}</span>
          ))}
          {show.language && (
            <span className="language-badge">🌐 {show.language}</span>
          )}
          <span className="rating-badge">⭐ {getRating()}</span>
        </div>

        <p className="tv-card-summary">
          {stripHtml(show.summary).substring(0, 150)}...
        </p>

        <div className="tv-card-actions">
          <button onClick={handleDetailClick} className="btn-detail">
            Detay
          </button>
          <button 
            onClick={handleWatchlistClick} 
            className={`btn-watchlist ${isInWatchlist ? 'in-watchlist' : ''}`}
            disabled={isInWatchlist}
          >
            {isInWatchlist ? 'Gösterime Ekle' : 'Gösterime Ekle'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TVCard;
