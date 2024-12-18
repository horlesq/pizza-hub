import { CartItemProps } from "../../types/types";
import { formatCurrency } from "../../utils/helpers";
import { DeleteItem } from "./DeleteItem";

export function CartItem({ item }: CartItemProps) {
  const { pizzaId, name, quantity, totalPrice } = item;
  console.log(pizzaId);
  return (
    <li className="py-3 md:flex md:items-center md:justify-between">
      <p className="mb-1">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between md:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}
