import { Key, ReactNode } from "react";

export interface ApiResponse<T> {
  status: string;
  data: T;
}

export type Coordinates = {
  latitude: number;
  longitude: number;
};

// MENU

export interface MenuItemType {
  id: number;
  name: string;
  unitPrice: number;
  imageUrl: string;
  ingredients: string[];
  soldOut: boolean;
}

export interface MenuItemProps {
  pizza: MenuItemType;
}

// CART

export type CartItemProps = {
  item: {
    pizzaId: number;
    name: string;
    quantity: number;
    totalPrice: number;
  };
};

export interface CartItemType {
  key?: Key | null | undefined;
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export type CartState = {
  cart: CartItemType[];
};

// ORDER

export interface OrderType {
  id: number;
  status: string;
  priority: boolean;
  priorityPrice: number;
  orderPrice: number;
  estimatedDelivery: string;
  cart: CartItemType[];
}

export type NewOrderType = {
  address: string;
  customer: string;
  phone: string;
  priority: boolean;
  cart: CartItemType[];
};

export type UpdateOrder = {
  priority: boolean;
};

export type OrderItemProps = {
  item: {
    quantity: number;
    name: string;
    totalPrice: number;
  };
  isLoadingIngredients?: boolean;
  ingredients?: string[];
};

// ERROR

export interface RouteError {
  message: string;
  data?: string;
}

export interface OrderError {
  phone?: string;
}

// BUTTON

export type ButtonVariant = "primary" | "secondary" | "small" | "round";

export type ButtonProps = {
  children: ReactNode;
  disabled?: boolean;
  to?: string;
  type: ButtonVariant;
  onClick?: (e: React.MouseEvent) => void;
};

export type LinkButtonProps = {
  children: ReactNode;
  to: string;
};

export type ItemProps = {
  pizzaId: number;
  currentQuantity?: number;
};

// USER

export type UserState = {
  username: string;
  status: "idle" | "loading" | "succeeded" | "failed"; // Status for async actions
  position: { latitude?: number; longitude?: number }; // Optional coordinates
  address: string;
  error?: string;
};

export interface GeolocationType {
  coords: {
    latitude: number;
    longitude: number;
  };
}
