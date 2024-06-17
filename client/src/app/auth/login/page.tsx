"use client";
import { useMutation } from "@apollo/client";
// import { LOGIN_USER } from "../../lib/queries";
import { useState } from "react";
// import cookie from "js-cookie";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const [login, { loading, error }] = useMutation(LOGIN_USER);
  //   const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // const { data } = await login({ variables: { input: { email, password } } });
    // if (data?.login?.token) {
    //   //   cookie.set("token", data.login.token);
    //   router.push("/");
    // }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl mb-4 text-black">Login</h2>
        {/* {error && <p className="text-red-500">{error.message}</p>} */}
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
          //   disabled={loading}
        >
          Login
        </button>
      </form>
    </div>
  );
}
