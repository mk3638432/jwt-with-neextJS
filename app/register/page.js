"use client";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const onChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/register", user);
      const data = await response.data;
      console.log(data);
      toast.success(`User registered successfully ${data?.message}  `);
      router.push("/login");
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  };
  return (
    <section className="min-h-screen flex flex-col items-center justify-center  ">
      <form
        onSubmit={onSubmitHandler}
        className="w-full mx-auto flex flex-col gap-5 md:w-1/2  "
      >
        <div className="mb-3">
          <label>Username</label>
          <input
            type="username"
            value={user.username}
            name="username"
            onChange={onChangeHandler}
            className=" w-full py-2 px-3 text-black ring-2 ring-blue-500 rounded border "
            placeholder="Enter username"
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            value={user.email}
            name="email"
            onChange={onChangeHandler}
            className=" w-full py-2 px-3 text-black ring-2 ring-blue-500 rounded border "
            placeholder="Enter Email"
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            value={user.password}
            onChange={onChangeHandler}
            name="password"
            className=" w-full py-2 px-3 text-black ring-2 ring-blue-500 rounded border "
            placeholder="Enter password"
          />
        </div>
        <div className="mb-3">
          <button className="px-5 w-full py-2 bg-blue-500 text-white rounded ">
            {" "}
            Sign Up
          </button>
        </div>
        <div className="mb-3 ">
          <p className="text-center">
            {" "}
            Already Have Account?{" "}
            <Link className="font-bold" href="/login">
              {" "}
              Log In
            </Link>{" "}
          </p>
        </div>
      </form>
    </section>
  );
};

export default page;
