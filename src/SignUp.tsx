import axios from "axios";
import { useState } from "react";

function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const signUp = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    axios
      .post("https://to-do-backend-4q5y.onrender.com/user/signup", {
        emailId: email,
        name: name,
        password: password,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="border-2 rounded border-solid border-black inline-block p-3">
      <h1 className="text-center">SignUp Page</h1>
      <form className="flex flex-col justify-center">
        <div className="py-2">
          Name:{" "}
          <input
            type="text"
            className="border-2 border-solid border-black rounded-md"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
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
          New Password:{" "}
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
            value="SignUp"
            className="border-solid border-2 border-black bg-slate-300 cursor-pointer px-3 py-1 rounded-2xl"
            onClick={signUp}
          />
        </div>
      </form>
    </div>
  );
}

export default SignUp;
