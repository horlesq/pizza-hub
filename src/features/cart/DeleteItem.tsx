import { useDispatch } from "react-redux";
import { Button } from "../../ui/Button";
import { deleteItem } from "./cartSlice";
import { ItemProps } from "../../types/types";

// The DeleteItem component takes pizzaId as a prop to
// delete a specific item from the cart
export function DeleteItem({ pizzaId }: ItemProps) {
  const dispatch = useDispatch();

  return (
    <Button type="small" onClick={() => dispatch(deleteItem(pizzaId))}>
      Remove
    </Button>
  );
}
