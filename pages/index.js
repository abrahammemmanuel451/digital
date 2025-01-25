import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [showAbout, setShowAbout] = useState(false); // Toggle for the About page

  const apiKey = "4pxDtwprvtxRmQPALmBY6oE0HmKFkZme5Wv7Uss84Vv66fLJ3uWeKtMB"; // Replace with your Pexels API key
  const apiUrl = "https://api.pexels.com/v1/curated";

  const fetchPhotos = async () => {
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: apiKey,
        },
        params: {
          page,
          per_page: 21,
        },
      });
      setPhotos(response.data.photos);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, [page]);

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  // Filter photos based on search query
  const filteredPhotos = photos.filter(
    (photo) =>
      photo.photographer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.alt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <header className="welcome-section">
        <h1>Group 8 ICT 235 Digital Art Gallery</h1>
        <p>Discover amazing photographs curated for you!</p>
      </header>

      {/* Search Bar */}
      {!showAbout && (
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by photographer or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      )}

      {!showAbout ? (
        <div className="gallery-container">
          {/* Gallery Section */}
          
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

          {/* Pagination */}
          <div className="pagination">
            <button onClick={handlePreviousPage} disabled={page === 1}>
              ◀ Previous
            </button>
            <span>Page {page}</span>
            <button onClick={handleNextPage}>Next ▶</button>
          </div>
        </div>
      ) : (
        <div className="about-container">
          <h1>About Us</h1>
          <p>
          The Digital Art Gallery, created by Group 8 of ICT 235, is a platform designed to showcase stunning photography curated from the Pexels API. It celebrates creativity and connects art enthusiasts with breathtaking works from talented photographers worldwide.
          </p>
          <button onClick={() => setShowAbout(false)}>Back to Gallery</button>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <button onClick={() => setShowAbout(true)}>About</button>
        <div className="contact">
          <h2>Contact Us</h2>
          <p>Email: contact@group8developer.com</p>
          <p>Phone: +234 906-414-3141</p>
        </div>
        <p>Created by Group 8 ICT 235</p>
      </footer>

      {/* Styles */}
      <style jsx>{`
        .welcome-section {
          background-color: #f8f9fa;
          padding: 20px;
          text-align: center;
          border-bottom: 2px solid #ddd;
        }
        .welcome-section h1 {
          margin: 0;
          font-size: 2.5em;
        }
        .search-bar {
          display: flex;
          justify-content: center;
          margin: 20px 0;
        }
        .search-bar input {
          width: 80%;
          max-width: 500px;
          padding: 10px;
          font-size: 1em;
          border: 1px solid #ccc;
          border-radius: 8px;
        }
        .gallery-container {
          text-align: center;
          padding: 20px;
        }
        .gallery {
          display: grid;
          grid-template-columns: repeat(3, 1fr); /* 3 columns */
          gap: 15px; /* Spacing between items */
        }
        .gallery-item {
          position: relative;
          width: 100%;
          overflow: hidden;
        }
        .gallery-item img {
          width: 100%;
          height: auto;
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
        .pagination {
          margin-top: 20px;
        }
        .pagination button {
          margin: 0 10px;
          padding: 10px 20px;
          font-size: 1em;
          cursor: pointer;
        }
        .pagination span {
          font-size: 1.2em;
          margin: 0 10px;
        }
        .footer {
          margin-top: 20px;
          padding: 20px;
          background-color: #333;
          color: #fff;
          text-align: center;
        }
        .footer .contact {
          margin: 10px 0;
        }
        .footer button {
          background: none;
          color: #fff;
          border: none;
          cursor: pointer;
          font-size: 1em;
          text-decoration: underline;
        }
        .footer button:hover {
          text-decoration: none;
        }
        .about-container {
          text-align: center;
          padding: 20px;
        }
        .about-container h1 {
          margin-bottom: 20px;
        }
          .about-container p {
          text-align: center;
          font-size: 20px;
          }
        .about-container button {
          margin-top: 20px;
          padding: 10px 20px;
          font-size: 1em;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Home;
