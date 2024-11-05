import {
    ApiResponse,
    MenuItemType,
    NewOrder,
    Order,
    UpdateOrder,
} from "../types/types";

const API_URL = "https://react-fast-pizza-api.onrender.com/api";

// Fetch menu
export async function getMenu(): Promise<MenuItemType[]> {
    const res = await fetch(`${API_URL}/menu`);

    if (!res.ok) throw Error("Failed getting menu");

    const json: ApiResponse<MenuItemType[]> = await res.json();
    return json.data;
}

// Fetch order by ID
export async function getOrder(id: number): Promise<Order> {
    const res = await fetch(`${API_URL}/order/${id}`);
    if (!res.ok) throw Error(`Couldn't find order #${id}`);

    const { data } = await res.json();
    return data;
}

// Create a new order
export async function createOrder(newOrder: NewOrder): Promise<Order> {
    try {
        const res = await fetch(`${API_URL}/order`, {
            method: "POST",
            body: JSON.stringify(newOrder),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) throw Error();
        const { data } = await res.json();
        return data;
    } catch {
        throw Error("Failed creating your order");
    }
}

// Update an order by ID
export async function updateOrder(
    id: number,
    updateObj: UpdateOrder
): Promise<void> {
    try {
        const res = await fetch(`${API_URL}/order/${id}`, {
            method: "PATCH",
            body: JSON.stringify(updateObj),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) throw Error();
    } catch {
        throw Error("Failed updating your order");
    }
}
