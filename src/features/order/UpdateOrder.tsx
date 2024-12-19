import { ActionFunctionArgs, useFetcher } from "react-router-dom";
import { Button } from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

// UpdateOrder component provides a button to update the order's priority after submiting
export function UpdateOrder() {
  // Used to handle form submissions in React Router
  const fetcher = useFetcher();

  return (
    // Send a PATCH request to update the order with priority status
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ params }: ActionFunctionArgs) {
  const orderId = params.orderId;

  if (!orderId) {
    throw new Error("Order ID is required");
  }
  const data = { priority: true };

  await updateOrder(orderId, data);
  return null;
}
