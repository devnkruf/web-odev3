import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ShowDetail.css';

const ShowDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchShowDetails = async () => {
      setIsLoading(true);
      setIsError(false);
      
      try {
        const [showResponse, episodesResponse] = await Promise.all([
          axios.get(`https://api.tvmaze.com/shows/${id}`),
          axios.get(`https://api.tvmaze.com/shows/${id}/episodes`)
        ]);
        
        setShow(showResponse.data);
        setEpisodes(episodesResponse.data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShowDetails();
  }, [id]);

  const handleBack = () => {
    navigate('/');
  };

  const stripHtml = (html) => {
    if (!html) return 'Özet yok';
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || 'Özet yok';
  };

  if (isLoading) {
    return (
      <div className="show-detail">
        <div className="loading">
          <div className="spinner"></div>
          <p>Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (isError || !show) {
    return (
      <div className="show-detail">
        <div className="error">
          <h2>Bir hata oluştu!</h2>
          <p>Dizi bilgileri yüklenirken bir sorun oluştu.</p>
          <button onClick={handleBack} className="back-button">
            ← Geri
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="show-detail">
      <header className="header">
        <div className="header-content">
          <h1><a href="/" className="header-title">🎬 Kampüs Film Kulübü</a></h1>
          <a href="/" className="home-link">
            Ana Sayfa
          </a>
        </div>
      </header>

      <div className="detail-container">
        <div className="detail-main">
          <div className="detail-top">
            <div className="detail-back-wrapper">
              <button onClick={handleBack} className="detail-back-button">
                ← Geri
              </button>
            </div>
            
            <div className="detail-content-wrapper">
              <div className="detail-poster">
                {show.image?.original ? (
                  <img src={show.image.original} alt={show.name} />
                ) : (
                  <div className="no-poster-detail">Poster Yok</div>
                )}
              </div>

              <div className="detail-info">
              <h2>{show.name}</h2>
              
              <div className="detail-badges">
                {show.genres && show.genres.map((genre, index) => (
                  <span key={index} className="genre-badge">{genre}</span>
                ))}
                {show.language && (
                  <span className="language-badge">🌐 {show.language}</span>
                )}
                <span className="rating-badge">⭐ {show.rating?.average || '-'}</span>
                {show.status && (
                  <span className="status-badge">{show.status === 'Ended' ? '📺 Ended' : '🔴 ' + show.status}</span>
                )}
                {show.premiered && (
                  <span className="date-badge">📅 {new Date(show.premiered).toLocaleDateString('tr-TR')}</span>
                )}
              </div>

              <div className="detail-description">
                <p>{stripHtml(show.summary)}</p>
              </div>
            </div>
          </div>
          </div>

          <div className="episodes-section">
            <h3>Bölümler</h3>
            {episodes.length === 0 ? (
              <p className="no-episodes">Bölüm bilgisi bulunamadı.</p>
            ) : (
              <div className="episodes-list">
                {episodes.map((episode) => (
                  <div key={episode.id} className="episode-item">
                    <div className="episode-left">
                      <span className="episode-season">S{episode.season}</span>
                      <span className="episode-separator">·</span>
                      <span className="episode-title">{episode.name}</span>
                    </div>
                    <div className="episode-right">
                      <span className="episode-meta">
                        #{episode.number || episode.id} {episode.airdate} {episode.runtime ? `${episode.runtime} dk` : ''}
                      </span>
                      <a 
                        href={episode.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="episode-source-btn"
                      >
                        Kaynak
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowDetail;
