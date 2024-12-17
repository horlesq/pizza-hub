import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";
import { useEffect, useState } from "react";

export function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (totalCartQuantity > 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [totalCartQuantity]);

  if (!totalCartQuantity) return null;

  return (
    <div
      className={`justify-betweenflex fixed bottom-0 left-0 right-0 flex items-center justify-between bg-slate-700 p-4 text-sm uppercase text-slate-200 transition-transform duration-300 ease-in-out sm:px-6 md:text-base ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <p className="space-x-4 font-semibold text-slate-300 sm:space-x-6">
        <span>{totalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}
