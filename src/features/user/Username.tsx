import { useSelector } from "react-redux";
import { getUsername } from "./userSlice";

export function Username() {
  const username = useSelector(getUsername);

  if (!username) return null;

  return <div className="text-m hidden font-semibold md:block">{username}</div>;
}
