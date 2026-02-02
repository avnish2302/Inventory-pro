import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", form);
      toast.success("Registration successful");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
      //alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-sm bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-1 text-gray-100">
          Create account
        </h2>
        <p className="text-sm text-gray-400 mb-6">
          Register to manage inventory
        </p>

        <form onSubmit={submit} className="space-y-4">
          <input
            className="w-full bg-gray-900 border border-gray-700 px-3 py-2 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            type="email"
            className="w-full bg-gray-900 border border-gray-700 px-3 py-2 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            type="password"
            className="w-full bg-gray-900 border border-gray-700 px-3 py-2 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-500 transition py-2 rounded text-white font-medium"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-gray-400 mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-400 hover:text-purple-300">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
