import axios from "axios";
import { User, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { auth, provider } from "@/firebase/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const index = () => {
  const router = useRouter();
const [email, setEmail] = useState("");
const [disabled, setdisabled] = useState(false);
const [message, setMessage] = useState(false);

  const handlesubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }
    try {
        setdisabled(true);
        setTimeout(() => {
  setdisabled(false);
  setMessage(true);
}, 2000);
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent. Please check your inbox.");
    } catch (error) {
      console.log(error);
      toast.error("Failed to send password reset email. Please try again.");
    } 
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Reset Password
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handlesubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full text-black pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your email address"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={disabled}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send Reset Email
              </button>
              
            </div>
            {message && (
                <p className="text-red-500 text-sm mt-2">
                  Password reset email sent. Please wait before sending another email.
                </p>
              )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default index;
