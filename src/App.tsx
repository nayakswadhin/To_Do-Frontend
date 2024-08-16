import { useState } from "react";
import "./App.css";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Task from "./Task";

function App() {
  const [userId, setUserId] = useState<string | null>(
    sessionStorage.getItem("userId")
  );

  return (
    <>
      {userId ? (
        <Task />
      ) : (
        <>
          <SignIn setUserId={setUserId} /> <SignUp />
        </>
      )}
    </>
  );
}

export default App;
