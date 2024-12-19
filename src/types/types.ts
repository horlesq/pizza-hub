import { Key, ReactNode } from "react";

/**
 * Represents a generic API response.
 * @template T - Type of the data contained in the response.
 */
export interface ApiResponse<T> {
  status: string; // Status of the API response (e.g., "success", "error").
  data: T;        // Data returned from the API.
}

/**
 * Represents geographic coordinates.
 */
export type Coordinates = {
  latitude: number;  // Latitude of the location.
  longitude: number; // Longitude of the location.
};

// ============================= MENU =============================

/**
 * Represents a single menu item (e.g., a pizza).
 */
export interface MenuItemType {
  id: number;             // Unique identifier for the menu item.
  name: string;           // Name of the pizza.
  unitPrice: number;      // Price per unit.
  imageUrl: string;       // URL of the pizza image.
  ingredients: string[];  // List of ingredients.
  soldOut: boolean;       // Indicates if the item is sold out.
}

/**
 * Props for a menu item component.
 */
export interface MenuItemProps {
  pizza: MenuItemType; // The menu item to display.
}

// ============================= CART =============================

/**
 * Props for a single cart item component.
 */
export type CartItemProps = {
  item: {
    pizzaId: number;  // ID of the pizza.
    name: string;     // Name of the pizza.
    quantity: number; // Quantity in the cart.
    totalPrice: number; // Total price for this item.
  };
};

/**
 * Represents a single item in the shopping cart.
 */
export interface CartItemType {
  key?: Key | null | undefined; // Optional key for React rendering.
  pizzaId: number;  // ID of the pizza.
  name: string;     // Name of the pizza.
  quantity: number; // Quantity in the cart.
  unitPrice: number; // Price per unit.
  totalPrice: number; // Total price for the item.
}

/**
 * Represents the state of the shopping cart.
 */
export type CartState = {
  cart: CartItemType[]; // Array of cart items.
};

// ============================= ORDER =============================

/**
 * Represents a single order.
 */
export interface OrderType {
  id: number;              // Unique order identifier.
  status: string;          // Current status of the order (e.g., "pending").
  priority: boolean;       // Indicates if the order is a priority order.
  priorityPrice: number;   // Additional cost for priority.
  orderPrice: number;      // Total price of the order.
  estimatedDelivery: string; // Estimated delivery time as a string.
  cart: CartItemType[];    // Items included in the order.
}

/**
 * Represents a new order to be created.
 */
export type NewOrderType = {
  address: string;   // Delivery address.
  customer: string;  // Customer name.
  phone: string;     // Customer phone number.
  priority: boolean; // Indicates if the order is a priority order.
  cart: CartItemType[]; // Items in the cart.
};

/**
 * Represents an update to an existing order.
 */
export type UpdateOrder = {
  priority: boolean; // Indicates if the order priority should be updated.
};

/**
 * Props for rendering individual order items.
 */
export type OrderItemProps = {
  item: {
    quantity: number; // Quantity of the item in the order.
    name: string;     // Name of the item.
    totalPrice: number; // Total price for the item.
  };
  isLoadingIngredients?: boolean; // Indicates if the ingredients are loading.
  ingredients?: string[]; // List of ingredients for the item.
};

// ============================= ERROR =============================

/**
 * Represents errors encountered during routing.
 */
export interface RouteError {
  message: string; // Error message.
  data?: string;   // Optional additional error data.
}

/**
 * Represents validation errors for orders.
 */
export interface OrderError {
  phone?: string; // Optional error for phone validation.
}

// ============================= BUTTON =============================

/**
 * Available button variants.
 */
export type ButtonVariant = "primary" | "secondary" | "small" | "round";

/**
 * Props for a reusable button component.
 */
export type ButtonProps = {
  children: ReactNode;         // Button content.
  disabled?: boolean;          // Indicates if the button is disabled.
  to?: string;                 // Optional navigation link.
  type: ButtonVariant;         // Button style variant.
  onClick?: (e: React.MouseEvent) => void; // Optional click handler.
};

/**
 * Props for a button used as a link.
 */
export type LinkButtonProps = {
  children: ReactNode; // Button content.
  to: string;          // Target URL.
};

/**
 * Props for handling cart-related items in certain contexts.
 */
export type ItemProps = {
  pizzaId: number;       // ID of the pizza.
  currentQuantity?: number; // Optional current quantity of the item.
};

// ============================= USER =============================

/**
 * Represents the state of a user in the application.
 */
export type UserState = {
  username: string; // Name of the user.
  status: "idle" | "loading" | "succeeded" | "failed"; // Status of async actions.
  position: {
    latitude?: number; // Optional latitude.
    longitude?: number; // Optional longitude.
  };
  address: string;   // Address of the user.
  error?: string;    // Optional error message.
};

/**
 * Represents geographic location data from the browser.
 */
export interface GeolocationType {
  coords: {
    latitude: number;  // Latitude of the location.
    longitude: number; // Longitude of the location.
  };
}
