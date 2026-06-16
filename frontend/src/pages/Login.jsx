import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";
import { saveToken } from "../utils/auth";
import {
  Brain,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Sparkles,
} from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const res = await API.post("/auth/login", form);

      saveToken(res.data.access_token || res.data.token);

      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }

      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-violet-700 via-fuchsia-600 to-cyan-500 p-6">
      <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-white/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-300/25 blur-3xl" />

      <div className="relative w-full max-w-md bg-white/90 backdrop-blur-2xl rounded-[2rem] shadow-2xl p-8 border border-white/30">
        <div className="flex justify-center mb-5">
          <div className="h-16 w-16 rounded-3xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-cyan-400 text-white flex items-center justify-center shadow-xl">
            <Brain size={34} />
          </div>
        </div>

        <h1 className="text-3xl font-black text-center text-slate-900">
          Welcome Back
        </h1>

        <p className="text-center text-slate-500 mt-2">
          Login to AI Demand Forecasting Suite
        </p>

        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-3 rounded-2xl text-sm mt-5 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-bold text-slate-700">
              Email Address
            </label>

            <div className="relative mt-1">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-500"
              />

              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded-2xl pl-12 pr-4 py-3 outline-none focus:ring-4 focus:ring-violet-200"
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
                className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-500"
              />

              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                className="w-full border rounded-2xl pl-12 pr-12 py-3 outline-none focus:ring-4 focus:ring-violet-200"
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 text-white py-3 rounded-2xl font-bold shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            <Sparkles size={18} />
            {loading ? "Logging in..." : "Login"}
          </button>

          <Link
            to="/forgot-password"
            className="block text-center mt-4 text-sm font-semibold text-violet-600 hover:text-fuchsia-600 transition"
          >
            Forgot Password?
          </Link>
        </form>

        <p className="text-sm text-center mt-6 text-slate-600">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-violet-600 font-bold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;