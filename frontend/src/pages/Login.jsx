import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data);
      toast.success("Logged in successfully");
      navigate("/"); // ✅ redirect to dashboard
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      //alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 bg-gray-800 border border-gray-700 p-6 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Login</h2>

      <form onSubmit={submit} className="space-y-4">
        <input
          className="w-full bg-gray-900 border border-gray-700 px-3 py-2 rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full bg-gray-900 border border-gray-700 px-3 py-2 rounded"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-purple-600 hover:bg-purple-500 py-2 rounded">
          Login
        </button>
      </form>

      <p className="text-sm text-gray-400 text-center mt-4">
        Don’t have an account?{" "}
        <Link to="/register" className="text-purple-400 hover:text-purple-300">
          Register
        </Link>
      </p>
    </div>
  );
}
