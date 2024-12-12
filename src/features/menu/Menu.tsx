import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import { MenuItem } from "./MenuItem";
import { MenuItemType } from "../../types/types.ts";

export function Menu() {
  const menu = useLoaderData() as MenuItemType[];

  return (
    <ul className="divede-slate-400 divide-y px-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  const menu = await getMenu();
  return menu;
}
