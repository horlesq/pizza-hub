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

export type Order = {
    id: number;
    items: MenuItemType[];
    total: number;
};

export type NewOrder = {
    items: { id: number; quantity: number }[];
};

export type UpdateOrder = {
    status?: string;
};
