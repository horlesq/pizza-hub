import { useDispatch } from "react-redux";
import { ItemProps } from "../../types/types";
import { Button } from "../../ui/Button";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";

export function UpdateItemQuantity({ pizzaId, currentQuantity }: ItemProps) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-1.5">
      <Button
        type="round"
        onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
      >
        -
      </Button>
      <span className="font-semibold">{currentQuantity}</span>
      <Button
        type="round"
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
      >
        +
      </Button>
    </div>
  );
}
