import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";
import { Mail, ArrowLeft, Sparkles } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.post("/auth/forgot-password", {
        email,
      });

      alert("Password reset link sent successfully");
      setEmail("");
    } catch (error) {
      alert("Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-700 via-fuchsia-600 to-cyan-500 p-6">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-2xl rounded-[2rem] shadow-2xl p-8">
        <div className="flex justify-center">
          <div className="h-16 w-16 rounded-3xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-cyan-400 text-white flex items-center justify-center">
            <Mail size={32} />
          </div>
        </div>

        <h1 className="text-3xl font-black text-center mt-6 text-slate-900">
          Forgot Password?
        </h1>

        <p className="text-center text-slate-600 mt-2">
          Enter your email address and we’ll send you a reset link.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-2xl px-4 py-3 outline-none focus:ring-4 focus:ring-violet-200"
          />

          <button
            disabled={loading}
            className="w-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <Sparkles size={18} />
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <Link
          to="/login"
          className="mt-5 flex items-center justify-center gap-2 text-sm font-semibold text-violet-600"
        >
          <ArrowLeft size={16} />
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;