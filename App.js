import React, { useState } from "react";
import ReactDOM from "react-dom/client";

const API_KEY = "45ff7423"; // OMDB API Key

const App = () => {
  const [query, setQuery] = useState("");
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");

  const fetchMovie = async () => {
    if (!query) return;
    setError("");
    setMovie(null);
    try {
      const res = await fetch(`https://www.omdbapi.com/?t=${query}&apikey=${API_KEY}`);
      const data = await res.json();
      if (data.Response === "True") {
        setMovie(data);
      } else {
        setError("Movie not found!");
      }
    } catch (err) {
      setError("Error fetching movie details");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", textAlign: "center" }}>
      <h1>IMDb Clone</h1>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px", width: "100%" }}>
        <input 
          type="text" 
          placeholder="Enter movie name" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          style={{ padding: "10px", width: "300px", marginBottom: "10px" }}
        />
        <button onClick={fetchMovie} style={{ padding: "10px 20px", cursor: "pointer" }}>Search</button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {movie && (
        <div style={{ marginTop: "20px", maxWidth: "400px", border: "1px solid #ddd", padding: "15px", borderRadius: "10px" }}>
          <h2>{movie.Title} ({movie.Year})</h2>
          <img src={movie.Poster} alt={movie.Title} style={{ width: "100%", borderRadius: "10px" }} />
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
          <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
        </div>
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
export default App;