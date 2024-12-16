import { OrderItemProps } from "../../types/types";
import { formatCurrency } from "../../utils/helpers";

export function OrderItem({
  item,
  isLoadingIngredients,
  ingredients,
}: OrderItemProps) {
  const { quantity, name, totalPrice } = item;
  console.log(ingredients, isLoadingIngredients);

  return (
    <li className="py-2">
      <div className="flex items-center justify-between gap-4 px-5 md:px-10">
        <p>
          <span className="font-semibold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}
