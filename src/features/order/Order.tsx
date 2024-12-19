// Test ID: IIDSAT
import {
  LoaderFunctionArgs,
  useFetcher,
  useLoaderData,
} from "react-router-dom";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import { getOrder } from "../../services/apiRestaurant";
import { OrderType } from "../../types/types";
import { OrderItem } from "./OrderItem";
import { useEffect } from "react";
import { UpdateOrder } from "./UpdateOrder";

export function Order() {
  const order = useLoaderData() as OrderType;
  const fetcher = useFetcher();

  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
    },
    [fetcher],
  );

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
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Oder #{id} status:</h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-slate-50">
              Priority
            </span>
          )}
          <span className="rounded-full bg-slate-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-200 px-4 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <ul className="divide-y divide-slate-200 border-b border-t">
        {cart.map((item) => (
          <OrderItem
            key={item.pizzaId}
            item={item}
            isLoadingIngredients={fetcher.state === "loading"}
            ingredients={
              fetcher.data?.find((el: { id: number }) => el.id === item.pizzaId)
                .ingredients
            }
          />
        ))}
      </ul>

      <div className="space-y-2 bg-slate-200 px-4 py-5">
        <p className="text-sm font-medium">
          Order price: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium">
            Priority order: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          Total: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>

      {!priority && <UpdateOrder />}
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.orderId) return;

  const order = await getOrder(params.orderId);
  return order;
}
