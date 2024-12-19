import { useDispatch, useSelector } from "react-redux";
import { MenuItemProps } from "../../types/types";
import { Button } from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice";
import { DeleteItem } from "../cart/DeleteItem";
import { UpdateItemQuantity } from "../cart/UpdateItemQuantity";

// MenuItem component for displaying each pizza in the menu
export function MenuItem({ pizza }: MenuItemProps) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  // Accessing Redux dispatch to dispatch actions
  const dispatch = useDispatch();

  // Getting the current quantity of the pizza in the cart from the Redux store
  const currentQuantity = useSelector(getCurrentQuantityById(id));

  // Checking if the pizza is already in the cart
  const isInCart = currentQuantity > 0;

  // Handler for adding an item to the cart
  function handleAddToCard() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
     // Dispatch the addItem action to add the pizza to the cart
    dispatch(addItem(newItem));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col pt-1">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic">{ingredients.join(", ")}</p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}

          {isInCart && (
            <div className="flex items-center gap-3 md:gap-10">
              <UpdateItemQuantity
                pizzaId={id}
                currentQuantity={currentQuantity}
              />
              <DeleteItem pizzaId={id} />
            </div>
          )}

          {!soldOut && !isInCart && (
            <Button type="small" onClick={handleAddToCard}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}
