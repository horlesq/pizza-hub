import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import { Button } from "../../ui/Button";
import { useSelector } from "react-redux";
import { getUsername } from "../user/userSlice";
import { getCart } from "../cart/cartSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

export function CreateOrder() {
  const username = useSelector(getUsername);
  // const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formError = useActionData() as OrderError;
  const cart = useSelector(getCart);

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

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input className="input" type="text" name="address" required />
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-red-400 focus:outline-none"
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
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting ? "Placing order..." : "Order now"}
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
