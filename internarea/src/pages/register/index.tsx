import axios from "axios";
import { User, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { auth, provider } from "@/firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const index = () => {
  const [formadata, setformadata] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();
  const [isloading, setisloading] = useState(false);


  const handlechange = (e: any) => {
    const { name, value } = e.target;
    setformadata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handlesubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formadata.username || !formadata.password) {
      toast.error("Please fill in all detials");
      return;
    }
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (!passwordRegex.test(formadata.password)) {
      toast.error(
        "Password only contain 6+ characters, uppercase, lowercase"
      );
      return;
    }
    try {
      setisloading(true);
      await createUserWithEmailAndPassword(
        auth,
        formadata.username,
        formadata.password
      );
      toast.success("Account created successfully");
      router.push("/login");
    } catch (error) {
      console.log(error);
      toast.error("Failed to create account");
    } finally {
      setisloading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Create new account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handlesubmit}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                email id
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formadata.username}
                  onChange={handlechange}
                  className="block w-full text-black pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your Email id"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                create Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formadata.password}
                  onChange={handlechange}
                  className="block w-full text-black pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isloading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isloading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                    Creating account...
                  </div>
                ) : (
                  " create account"
                )}
              </button>
              <p className="w-full px-4 py-2 flex items-center justify-center space-x-2">or</p>
              <p>Already have an account? <a href="/login" className="text-sm text-blue-600 hover:text-blue-800">Login</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default index;
