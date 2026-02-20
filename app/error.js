"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">Something went wrong!</h2>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors duration-200"
      >
        {" "}
        Try again
      </button>
    </div>
  );
}
