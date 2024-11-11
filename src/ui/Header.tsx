import { Link } from "react-router-dom";
import { SearchOrder } from "../features/order/SearchOrder";
import { Username } from "../features/user/Username";

export function Header() {
  return (
    <header className="flex items-center justify-between bg-red-500 px-4 py-4 uppercase sm:px-6">
      <Link to="/" className="text-2xl font-bold tracking-widest">
        Pizza Hub
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}
