import { useDispatch } from "react-redux";
import { Button } from "../../ui/Button";
import { deleteItem } from "./cartSlice";
import { DeleteItemProps } from "../../types/types";

export function DeleteItem({ pizzaId }: DeleteItemProps) {
  const dispatch = useDispatch();

  return (
    <Button type="small" onClick={() => dispatch(deleteItem(pizzaId))}>
      Remove
    </Button>
  );
}
