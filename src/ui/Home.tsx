import { useSelector } from "react-redux";
import { CreateUser } from "../features/user/CreateUser";
import { Button } from "./Button";
import { getUsername } from "../features/user/userSlice";

export function Home() {
  const username = useSelector(getUsername);

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
