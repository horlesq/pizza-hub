import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

// SearchOrder component allows users to search for an order by its ID
export function SearchOrder() {
  const [query, setQuery] = useState<string>();
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!query) return;

    navigate(`/order/${query}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search order number"
        value={query}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setQuery(e.target.value)
        }
        className="w-28 rounded-full bg-red-50 px-4 py-2 text-sm transition-all duration-300 placeholder:text-slate-400 focus:outline-none focus:ring focus:ring-slate-500 focus:ring-opacity-50 sm:w-64"
      ></input>
    </form>
  );
}
