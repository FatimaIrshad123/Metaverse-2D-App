// pages/auth.tsx
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const BACKEND_URL = "http://localhost:3000"; // Replace with your backend URL

const AuthPage: React.FC = () => {
  const [isSignup, setIsSignup] = useState(true); // Toggle between Signup and Signin
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isSignup) {
        // Signup logic
        const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
          username,
          password,
          type: "admin",
        });
        toast.success("Signup successful!");
      } else {
        // Signin logic
        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
          username,
          password,
        });
        toast.success("Signin successful!");
        // Handle token (e.g., store in localStorage or Recoil state)
        const { token } = response.data;
        localStorage.setItem("authToken", token);
      }
    } catch (error: any) {
      if (error.response?.status === 400) {
        toast.error("Invalid input. Please check your credentials.");
      } else if (error.response?.status === 403) {
        toast.error("Authentication failed. Please check your credentials.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isSignup ? "Sign Up" : "Sign In"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <button onClick={handleSubmit}
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            className="text-blue-500 hover:underline"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
