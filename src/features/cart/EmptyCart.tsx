import { LinkButton } from "../../ui/LinkButton";

export function EmptyCart() {
  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <p className="mt-7 text-xl font-semibold">
        Nothing here yet! Start building your pizza order.
      </p>
    </div>
  );
}
