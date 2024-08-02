"use client";
import "./search.scss";
import { useState, useEffect, useCallback, useRef } from "react";
import { fetchNews } from "@/app/api/newsService";
import Link from "next/link";

const Search = ({}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const searchRef = useRef(null);

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const fetchResults = async (query) => {
    if (query.length > 2) {
      const res = await fetch("/api/searchNews", {
        method: "POST",
        body: JSON.stringify({ query }),
        headers: { "Content-Type": "application/json" },
        next: { revalidate: 3600 },
      });
      const data = await res.json();
      setResults(data);
      setIsResultsVisible(true);
    } else {
      setResults([]);
      setIsResultsVisible(false);
    }
  };

  const debouncedFetchResults = useCallback(debounce(fetchResults, 500), []);

  useEffect(() => {
    debouncedFetchResults(query);
  }, [query, debouncedFetchResults]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setIsResultsVisible(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="search-parent" ref={searchRef}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search any News..."
        className="search-input"
      />
      {isResultsVisible && results.length > 0 && (
        <ul className="search-dropdown">
          {results.map((val, index) => (
            <Link href={val.url} key={index} target="_blank">
              <li>{val.name}</li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
