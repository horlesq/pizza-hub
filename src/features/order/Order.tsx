// Test ID: IIDSAT
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
    calcMinutesLeft,
    formatCurrency,
    formatDate,
} from "../../utils/helpers";
import { OrderType } from "../../types/types";

export function Order() {
    const order = useLoaderData() as OrderType;

    // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
    const {
        id,
        status,
        priority,
        priorityPrice,
        orderPrice,
        estimatedDelivery,
        cart,
    } = order;
    const deliveryIn = calcMinutesLeft(estimatedDelivery);

    return (
        <div>
            <div>
                <h2>Status</h2>

                <div>
                    {priority && <span>Priority</span>}
                    <span>{status} order</span>
                </div>
            </div>

            <div>
                <p>
                    {deliveryIn >= 0
                        ? `Only ${calcMinutesLeft(
                              estimatedDelivery
                          )} minutes left 😃`
                        : "Order should have arrived"}
                </p>
                <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
            </div>

            <div>
                <p>Price pizza: {formatCurrency(orderPrice)}</p>
                {priority && (
                    <p>Price priority: {formatCurrency(priorityPrice)}</p>
                )}
                <p>
                    To pay on delivery:{" "}
                    {formatCurrency(orderPrice + priorityPrice)}
                </p>
            </div>
        </div>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params }: LoaderFunctionArgs) {
    if (!params.orderId) return;

    const order = await getOrder(params.orderId);
    return order;
}
