// import { useState } from "react";

import { Form, redirect } from "react-router-dom";
import { CartItemType } from "../../types/types";
import { createOrder } from "../../services/apiRestaurant";

// https://uibakery.io/regex-library/phone-number
// const isValidPhone = (str) =>
//     /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
//         str
//     );

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
    const cart = fakeCart;
    console.log(cart);

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
                    <label htmlFor="priority">
                        Want to yo give your order priority?
                    </label>
                </div>

                <div>
                    <input
                        type="hidden"
                        name="cart"
                        value={JSON.stringify(cart)}
                    />
                    <button>Order now</button>
                </div>
            </Form>
        </div>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }: { request: Request }) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    console.log(data);
    const order = {
        address: data.address as string,
        customer: data.customer as string,
        phone: data.phone as string,
        cart: JSON.parse(data.cart as string),
        priority: data.priority === "on",
    };

    const newOrder = await createOrder(order);

    return redirect(`/order/${newOrder.id}`);
}
