"use client";
import React, { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import Image from "next/image";
import SearchResult from "./SearchResult";
import { useRouter } from "next/navigation"; // app directory জন্য

const SearchBox = ({ docs }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [term, setTerm] = useState("");

  const router = useRouter();

  const handleSearch = (value) => {
    const foundDocs = docs.filter((doc) =>
      doc.title.toLowerCase().includes(value.toLowerCase()),
    );
    setSearchResults(foundDocs);
  };

  const debouncedSearch = useDebounce(handleSearch, 500);

  const handleChange = (e) => {
    const value = e.target.value;
    setTerm(value);
    debouncedSearch(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(term);
  };

  const closeSearchResults = (path) => {
    router.push(path); // সরাসরি path দিন
    setTerm("");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex items-center border border-gray-300 rounded-lg overflow-hidden"
      >
        {/* Input */}
        <input
          type="text"
          value={term}
          onChange={handleChange}
          placeholder="Search..."
          className="px-4 py-2 text-sm w-56 focus:outline-none"
        />

        {/* Button with Image */}
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white border-none
             transition-colors duration-200 flex items-center justify-center"
        >
          <Image src="/search.svg" alt="Search" width={16} height={16} />
        </button>
      </form>

      {term && term.trim().length > 0 && (
        <SearchResult
          results={searchResults}
          term={term}
          closeSearchResults={(path) => closeSearchResults(path)}
        />
      )}
    </>
  );
};

export default SearchBox;
