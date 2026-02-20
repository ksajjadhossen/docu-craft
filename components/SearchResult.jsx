import Link from "next/link";
import React from "react";

const SearchResult = ({ results, term, closeSearchResults }) => {
  return (
    <div className=" absolute left-0 top-12 z-999 w-full rounded-lg bg-lighterDark p-4 shadow">
      <p className="!text-lg">
        {results.length} results found for{" "}
        <span className="font-medium">{term}</span>
      </p>
      <ul role="list" className="divide-y bg-lighterDark py-2">
        {results.map((result) => (
          <li key={result.id} className="py-1 border-b border-gray-200">
            <Link
              href={`/docs/${result.id}`}
              className="transition-all hover:text-emerald-600"
              onClick={(e) => closeSearchResults(e)}
            >
              {result.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResult;
