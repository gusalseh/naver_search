// src/App.js
import React, { useState } from "react";
import { searchRestaurants } from "./api/naverSearch";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const data = await searchRestaurants(query);
    console.log("data: ", data);
    setResults(data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>네이버 지역검색 API 되냐?</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for restaurants..."
        style={{ padding: "10px", width: "300px" }}
      />
      <button
        onClick={handleSearch}
        style={{ padding: "10px", marginLeft: "10px" }}
      >
        Search
      </button>
      <div style={{ marginTop: "20px" }}>
        {results.length > 0 ? (
          <ul>
            {results.map((item, index) => (
              <li key={index} style={{ marginBottom: "10px" }}>
                <h2>{item.title.replace(/<\/?[^>]+(>|$)/g, "")}</h2>
                <p>{item.address}</p>
                <p>{item.category}</p>
                <p>{item.description}</p>
                <p>{item.roadAddress}</p>
                <p>{item.mapx}</p>
                <p>{item.mapy}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
}

export default App;
