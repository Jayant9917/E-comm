import { useState } from "react";
import { Link } from "react-router-dom";
import registerIMG from "../assets/register.webp";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Register:", { name, email, password });
  };

  return (
    <div className="flex">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm"
        >
          <div className="flex justify-center mb-6">
            <h2 className="text-xl font-medium ">Rabbit</h2>
          </div>
          <h2 className="text-2xl font-bold text-center mb-6">
            Hey there!....
          </h2>
          <p className="text-center mb-6">
            Enter Your username and password to Login
          </p>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your Full Name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your Email"
            />
          </div>
          <div className="mb-4 ">
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your Password"
            />
          </div>
          <button
            className="w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition"
            type="submit"
          >
            Sign Up
          </button>
          <p className="mt-6 text-center text-sm">
            You have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>

      <div className="hidden md:block w-1/2 bg-gray-800 ">
        <div className="h-full flex flex-col justify-center items-center">
          <img
            src={registerIMG}
            alt="login image"
            className="w-full h-[750px] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
