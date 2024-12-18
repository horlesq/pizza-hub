import { CartItemProps } from "../../types/types";
import { formatCurrency } from "../../utils/helpers";
import { DeleteItem } from "./DeleteItem";
import { UpdateItemQuantity } from "./UpdateItemQuantity";

export function CartItem({ item }: CartItemProps) {
  const { pizzaId, name, quantity, totalPrice } = item;
  
  return (
    <li className="py-3 md:flex md:items-center md:justify-between">
      <p className="mb-1">
        {quantity} &times; {name}
      </p>
      <div className="flex items-center justify-between md:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity pizzaId={pizzaId} currentQuantity={quantity} />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}
