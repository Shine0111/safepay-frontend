import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import apiClient from "../services/api-client";
import { useRef } from "react";

function SearchBar() {
  const [liveSearchResults, setLiveSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const dropdownRef = useRef(null);

  const handleSearchChange = async (e) => {
    const query = e.target.value;

    if (query.trim() === "") {
      setLiveSearchResults([]);
      return;
    }

    try {
      setIsLoading(true);
      const response = await apiClient.get(`/api/products/search?q=${query}`);
      setLiveSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = () => {};

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setLiveSearchResults([]);
      }
    }
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown">
      <form
        onSubmit={(e) => e.preventDefault()}
        style={{ display: "flex", flexDirection: "row", gap: 2 }}
      >
        <input
          type="search"
          id="product-search"
          name="product-search"
          onChange={handleSearchChange}
        />

        <button type="submit" className="btn" onSubmit={onSubmit}>
          <FaSearch />
        </button>
      </form>

      {liveSearchResults.length > 0 && (
        <div className="dropdown-content flex-row" ref={dropdownRef}>
          {isLoading && <li>Loading...</li>}
          {liveSearchResults.map((result) => (
            <div key={result._id}>{result.name}</div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
