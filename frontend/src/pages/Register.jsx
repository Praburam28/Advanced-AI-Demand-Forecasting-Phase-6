import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";
import {
  Brain,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Sparkles,
  User,
  ShieldCheck,
} from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      await API.post("/auth/register", form);

      alert("Account created successfully");
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Try another email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-cyan-500 via-blue-600 to-violet-700 p-6">
      <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-white/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-violet-300/25 blur-3xl" />

      <div className="relative w-full max-w-md bg-white/90 backdrop-blur-2xl rounded-[2rem] shadow-2xl p-8 border border-white/30">
        <div className="flex justify-center mb-5">
          <div className="h-16 w-16 rounded-3xl bg-gradient-to-br from-cyan-500 via-blue-600 to-violet-700 text-white flex items-center justify-center shadow-xl">
            <Brain size={34} />
          </div>
        </div>

        <h1 className="text-3xl font-black text-center text-slate-900">
          Create Account
        </h1>

        <p className="text-center text-slate-500 mt-2">
          Join AI Demand Forecasting Suite
        </p>

        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-3 rounded-2xl text-sm mt-5 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-bold text-slate-700">
              Full Name
            </label>

            <div className="relative mt-1">
              <User
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500"
              />

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border rounded-2xl pl-12 pr-4 py-3 outline-none focus:ring-4 focus:ring-blue-200"
                placeholder="Enter name"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-bold text-slate-700">
              Email Address
            </label>

            <div className="relative mt-1">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500"
              />

              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded-2xl pl-12 pr-4 py-3 outline-none focus:ring-4 focus:ring-blue-200"
                placeholder="Enter email"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-bold text-slate-700">
              Password
            </label>

            <div className="relative mt-1">
              <LockKeyhole
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500"
              />

              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                className="w-full border rounded-2xl pl-12 pr-12 py-3 outline-none focus:ring-4 focus:ring-blue-200"
                placeholder="Enter password"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm font-bold text-slate-700">
              Role
            </label>

            <div className="relative mt-1">
              <ShieldCheck
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500"
              />

              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full border rounded-2xl pl-12 pr-4 py-3 outline-none focus:ring-4 focus:ring-blue-200"
              >
                <option value="user">User</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-700 text-white py-3 rounded-2xl font-bold shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            <Sparkles size={18} />
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-slate-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-bold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;