import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import { Button } from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddress } from "../user/userSlice";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import { OrderError } from "../../types/types";
import { EmptyCart } from "../cart/EmptyCart";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import store, { AppDispatch, RootState } from "../../store";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

export function CreateOrder() {
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state: RootState) => state.user);
  const isLoadingAddress = addressStatus === "loading";
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formError = useActionData() as OrderError;
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  const dispatch = useDispatch<AppDispatch>();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">
        Place your order now and enjoy!
      </h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40"> Name</label>
          <input
            className="input"
            type="text"
            defaultValue={username}
            name="customer"
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input" type="tel" name="phone" required />
            {formError?.phone && (
              <p className="mx-20 mt-2 rounded-md bg-red-100 p-1 text-center text-xs text-red-600">
                {formError.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input"
              type="text"
              name="address"
              disabled={isLoadingAddress}
              defaultValue={address}
              required
            />
            {addressStatus === "failed" && (
              <p className="mx-20 mt-2 rounded-md bg-red-100 p-1 text-center text-xs text-red-600">
                {errorAddress}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <span className="absolute right-1 top-[35px] z-50 sm:top-[3px] md:top-[3px]">
              <input
                type="hidden"
                name="position"
                value={
                  position.latitude && position.longitude
                    ? `${position.latitude},${position.longitude}`
                    : ""
                }
              />
              <Button
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
                disabled={isLoadingAddress}
              >
                Get position
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center justify-center gap-5">
          <input
            className="h-6 w-6 accent-red-400 focus:outline-none"
            type="checkbox"
            name="priority"
            id="priority"
            checked={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div className="flex justify-center">
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button type="primary" disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting
              ? "Placing order..."
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }: { request: Request }) {
  // Retrieve form data from the POST request
  const formData = await request.formData();

  // Convert form data entries to a plain object
  const data = Object.fromEntries(formData);

  // Construct an order object from the form data
  const order = {
    address: data.address as string,
    customer: data.customer as string,
    phone: data.phone as string,
    cart: JSON.parse(data.cart as string),
    priority: data.priority === "on",
  };

  // Initialize an errors object to track any validation issues
  const error = {} as OrderError;

  // Validate the phone number format; if invalid, add an error message
  if (!isValidPhone(order.phone))
    error.phone = "Please insert a valid phone number!";

  // Check if there are any validation errors
  // If errors exist, return them, preventing order creation
  if (Object.keys(error).length > 0) return error;

  // If all data is valid, create a new order in the system
  const newOrder = await createOrder(order);

  // Clear cart
  store.dispatch(clearCart());

  // Redirect the user to the newly created order page
  return redirect(`/order/${newOrder.id}`);
}
