import { Link } from "react-router-dom";
import { SearchOrder } from "../features/order/SearchOrder";

export function Header() {
    return (
        <header>
            <Link to="/">Pizza Hub</Link>
            <SearchOrder />
        </header>
    );
}
