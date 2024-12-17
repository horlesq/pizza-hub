import { RootState } from "../../store";
import { useSelector } from "react-redux";

export function Username() {
  const username = useSelector((state: RootState) => state.user.username);

  if (!username) return null;

  return <div className="text-m hidden font-semibold md:block">{username}</div>;
}
