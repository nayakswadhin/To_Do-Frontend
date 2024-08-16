import axios from "axios";
import { useState } from "react";

function SignIn({ setUserId }: { setUserId: (id: string | null) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    axios
      .post("https://to-do-backend-4q5y.onrender.com/user/login", {
        emailId: email,
        password: password,
      })
      .then((res) => {
        console.log(res);
        sessionStorage.setItem("userId", res.data.userId);
        setUserId(sessionStorage.getItem("userId"));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="border-2 rounded border-solid border-black inline-block p-3 m-3">
      <h1 className="text-center">SignIn Page</h1>
      <form className="flex flex-col justify-center">
        <div className="py-2">
          Email:{" "}
          <input
            type="email"
            className="border-2 border-solid border-black rounded-md"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="py-2">
          Password:{" "}
          <input
            type="password"
            className="border-2 border-solid border-black rounded-md"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div>
          <input
            type="submit"
            value="SignIn"
            className="border-solid border-2 border-black bg-slate-300 cursor-pointer px-3 py-1 rounded-2xl"
            onClick={signIn}
          />
        </div>
      </form>
    </div>
  );
}

export default SignIn;
