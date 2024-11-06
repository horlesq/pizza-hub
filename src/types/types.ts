export interface ApiResponse<T> {
    status: string;
    data: T;
}

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

export interface CartItemType {
    pizzaId: number;
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
}

export interface OrderType {
    id: number;
    status: string;
    priority: boolean;
    priorityPrice: number;
    orderPrice: number;
    estimatedDelivery: string;
    cart: CartItemType[];
}

export type NewOrder = {
    items: { id: number; quantity: number }[];
};

export type UpdateOrder = {
    status?: string;
};

export interface RouteError {
    message: string;
    data?: string;
}
