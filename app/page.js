"use client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Home() {
  const router = useRouter();

  const handleLogOut = async () => {
    try {
      const response = await axios.get("/api/logout");
      const data = await response.data;
      toast.success(`User registered successfully ${data?.message}  `);
      router.push("/");
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  };
  return (
    <div>
      <section className="min-h-screen flex flex-col items-center justify-center  ">
        <h1>
          Username : <span className="font-bold  text-2xl "> MANOJ</span>
        </h1>
        <h1>
          Email : <span className="font-bold  text-2xl "> MANOJ</span>
        </h1>
        <div>
          <button
            onClick={handleLogOut}
            className="px-5 py-2 text-white  bg-blue-500 rounded "
          >
            LogOut
          </button>
        </div>
      </section>
    </div>
  );
}
