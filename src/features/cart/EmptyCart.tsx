import { LinkButton } from "../../ui/LinkButton";

export function EmptyCart() {
  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <p className="text-l mt-7 font-semibold md:text-xl">
        Nothing here yet! Start building your pizza order.
      </p>
    </div>
  );
}
