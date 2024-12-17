import { useSelector } from "react-redux";
import { CreateUser } from "../features/user/CreateUser";
import { Button } from "./Button";
import { RootState } from "../store";

export function Home() {
  const username = useSelector((state: RootState) => state.user.username);

  return (
    <div className="my-10 text-center sm:my-16">
      <h1 className="sm: mb-10 text-center text-2xl font-bold sm:text-3xl">
        Fresh pizza, just for you.
        <br />
        <span className="font-semibold text-red-500">
          Hot, delicious, and ready to go.
        </span>
      </h1>

      {username === "" ? (
        <CreateUser />
      ) : (
        <Button to="menu" type="primary">
          Open menu
        </Button>
      )}
    </div>
  );
}
