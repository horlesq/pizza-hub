import { useSelector } from "react-redux";
import { getUsername } from "./userSlice";

// Username component that displays the user's name 
// if it's available in the Redux store
export function Username() {
  const username = useSelector(getUsername);

  if (!username) return null;

  return <div className="text-m hidden font-semibold md:block">{username}</div>;
}
