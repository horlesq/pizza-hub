import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import { MenuItem } from "./MenuItem";
import { MenuItemType } from "../../types/types.ts";

// The Menu component displays a list of menu items
// by mapping through the 'menu' array
export function Menu() {
  // Retrieving the menu data loaded by the loader function
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
  // Fetch the menu data and passes it to the Menu component before rendering
  const menu = await getMenu();
  return menu;
}
