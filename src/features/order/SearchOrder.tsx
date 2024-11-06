import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

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
            ></input>
        </form>
    );
}
