import {
  ApiResponse,
  MenuItemType,
  NewOrderType,
  OrderType,
  UpdateOrder,
} from "../types/types";

// Base URL for the API
const API_URL = "https://react-fast-pizza-api.onrender.com/api";

/**
 * Fetches the menu items from the API.
 *
 * @returns {Promise<MenuItemType[]>} - A promise that resolves to an array of menu items.
 * @throws {Error} - Throws an error if the API request fails or the response is not OK.
 */
export async function getMenu(): Promise<MenuItemType[]> {
  const res = await fetch(`${API_URL}/menu`);

  if (!res.ok) throw Error("Failed getting menu");

  const json: ApiResponse<MenuItemType[]> = await res.json();
  return json.data;
}

/**
 * Fetches an order by its ID.
 *
 * @param {string} id - The order ID.
 * @returns {Promise<OrderType>} - A promise that resolves to the order data.
 * @throws {Error} - Throws an error if the order ID is not found or the request fails.
 */
export async function getOrder(id: string): Promise<OrderType> {
  const res = await fetch(`${API_URL}/order/${id}`);
  if (!res.ok) throw Error(`Couldn't find order number: ${id}`);

  const { data } = await res.json();
  return data;
}

/**
 * Creates a new order.
 *
 * @param {NewOrderType} newOrder - The new order data to be created.
 * @returns {Promise<OrderType>} - A promise that resolves to the newly created order.
 * @throws {Error} - Throws an error if the order creation fails.
 */
export async function createOrder(newOrder: NewOrderType): Promise<OrderType> {
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

/**
 * Updates an order by its ID.
 *
 * @param {string | undefined} id - The ID of the order to be updated.
 * @param {UpdateOrder} updateObj - The update data to modify the order.
 * @returns {Promise<void>} - A promise that resolves when the order has been updated.
 * @throws {Error} - Throws an error if the update request fails.
 */
export async function updateOrder(
  id: string | undefined,
  updateObj: UpdateOrder,
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
