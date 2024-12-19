import { Outlet, useNavigation } from "react-router-dom";
import { CartOverview } from "../features/cart/CartOverview";
import { Header } from "./Header";
import { Loader } from "./Loader";

// AppLayout main layout component that structures the application's UI
export function AppLayout() {
  // Get the navigation state from React Router to track loading status
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}

      <Header />

      <div className="overflow-auto">
        <main className="mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>

      <CartOverview />
    </div>
  );
}
