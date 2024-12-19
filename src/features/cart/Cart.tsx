import { LinkButton } from "../../ui/LinkButton";
import { Button } from "../../ui/Button";
import { CartItem } from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart } from "./cartSlice";
import { getUsername } from "../user/userSlice";
import { EmptyCart } from "./EmptyCart";

// Cart component for displaying user's cart
export function Cart() {
  // Fetching the username from the user slice in Redux store
  const username = useSelector(getUsername);
  // Fetching the cart items from the cart slice in Redux store
  const cart = useSelector(getCart);
  // Dispatch function to dispatch actions like clearing the cart
  const dispatch = useDispatch();

  // If the cart is empty, display the EmptyCart component
  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>

      <ul className="divede-slate-200 mt-3 divide-y border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId}></CartItem>
        ))}
      </ul>

      <div className="mt-6 space-x-2">
        <Button type="primary" to="/order/new">
          Place Order
        </Button>
        <Button type="secondary" onClick={() => dispatch(clearCart())}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}
