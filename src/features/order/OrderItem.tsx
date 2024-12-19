import { OrderItemProps } from "../../types/types";
import { formatCurrency } from "../../utils/helpers";

// The OrderItem component displays the details of an individual order item
export function OrderItem({
  item,
  isLoadingIngredients,
  ingredients,
}: OrderItemProps) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-2">
      <div className="flex items-center justify-between gap-4 px-5 md:px-10">
        <p>
          <span className="font-semibold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="text-sm capitalize italic text-slate-500 md:px-10">
        {isLoadingIngredients ? "Loading..." : ingredients?.join(". ")}
      </p>
    </li>
  );
}
