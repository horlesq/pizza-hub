// import { useState } from "react";

import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { CartItemType, OrderError } from "../../types/types";
import { createOrder } from "../../services/apiRestaurant";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const fakeCart: CartItemType[] = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

export function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formError = useActionData() as OrderError;
  const cart = fakeCart;

  return (
    <div>
      <h2>Ready to order? Let's go!</h2>

      <Form method="POST">
        <div>
          <label>First Name</label>
          <input type="text" name="customer" required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" required />
          </div>
          {formError?.phone && <p>{formError.phone}</p>}
        </div>

        <div>
          <label>Address</label>
          <div>
            <input type="text" name="address" required />
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <button
            disabled={isSubmitting}
            className="inline-block rounded-full bg-red-500 px-4 py-3 font-semibold uppercase tracking-wide text-slate-800 transition-colors duration-300 hover:bg-red-400 focus:bg-red-400 focus:outline-none focus:ring focus:ring-red-500 focus:ring-offset-1 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Placing order..." : "Order now"}
          </button>
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

  // Construct an order object from the form data,
  // casting each entry to the correct type
  const order = {
    address: data.address as string, // Customer address as a string
    customer: data.customer as string, // Customer name as a string
    phone: data.phone as string, // Customer phone number as a string
    cart: JSON.parse(data.cart as string), // Cart data parsed from a JSON string
    priority: data.priority === "on", // Boolean to indicate if order has priority
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

  // Redirect the user to the newly created order page
  return redirect(`/order/${newOrder.id}`);
}
