import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [photos, setPhotos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  const apiKey = '4pxDtwprvtxRmQPALmBY6oE0HmKFkZme5Wv7Uss84Vv66fLJ3uWeKtMB'; // Replace with your Pexels API key
  const apiUrl = 'https://api.pexels.com/v1/curated';

  const fetchPhotos = async (reset = false) => {
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: apiKey,
        },
        params: {
          page: reset ? 1 : page,
          per_page: 15,
        },
      });

      // Reset photos if it's a refresh, otherwise append new photos
      setPhotos(reset ? response.data.photos : (prevPhotos) => [...prevPhotos, ...response.data.photos]);

      // If reset, reset the page to 2 for infinite scrolling
      if (reset) setPage(4);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  useEffect(() => {
    // Fetch new set of images when the component mounts
    fetchPhotos(true);
  }, []); // Empty dependency array ensures it runs once on refresh

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
      setPage((prevPage) => prevPage + 1);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch more images when `page` changes, but not on refresh
  useEffect(() => {
    if (page > 1) {
      fetchPhotos();
    }
  }, [page]);

  const filteredPhotos = photos.filter(photo =>
    photo.photographer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    photo.alt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="gallery-container">
      <h1>Digital Art Gallery</h1>
      <input
        type="text"
        placeholder="Search  "
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="gallery">
        {filteredPhotos.map((photo) => (
          <div className="gallery-item" key={photo.id}>
            <img src={photo.src.medium} alt={photo.alt} />
            <div className="overlay">
              <span className="photographer">{photo.photographer}</span>
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        .gallery-container {
          text-align: center;
        }
        .gallery {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }
        .gallery-item {
          position: relative;
          margin: 10px;
        }
        .gallery-item img {
          width: 100%;
          display: block;
          border-radius: 8px;
        }
        .overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          background: rgba(0, 0, 0, 0.5);
          color: #fff;
          padding: 5px 10px;
          text-align: left;
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
        }
        .photographer {
          font-size: 15px;
          font-weight: bold;
        }
        input {
          margin-bottom: 20px;
          padding: 10px;
          width: 80%;
          max-width: 400px;
        }
      `}</style>
    </div>
  );
};

export default Home;
