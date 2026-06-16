import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import API from "../api/api";
import {
  LockKeyhole,
  ArrowLeft,
  Sparkles,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [loading, setLoading] = useState(false);

  const updatePassword = (value) => {
    setPassword(value);

    if (!value) {
      setPasswordStrength("");
    } else if (value.length < 6) {
      setPasswordStrength("Weak");
    } else if (value.length < 10) {
      setPasswordStrength("Medium");
    } else {
      setPasswordStrength("Strong");
    }
  };

  const strengthColor =
    passwordStrength === "Strong"
      ? "text-emerald-600"
      : passwordStrength === "Medium"
      ? "text-yellow-600"
      : "text-red-600";

  const strengthBar =
    passwordStrength === "Strong"
      ? "w-full bg-emerald-500"
      : passwordStrength === "Medium"
      ? "w-2/3 bg-yellow-500"
      : passwordStrength === "Weak"
      ? "w-1/3 bg-red-500"
      : "w-0";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await API.post("/auth/reset-password", {
        token,
        password,
      });

      alert("Password updated successfully");
      navigate("/login");
    } catch (error) {
      alert("Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-cyan-500 via-blue-600 to-violet-700 p-6">
      <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-white/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-violet-300/25 blur-3xl" />

      <div className="relative w-full max-w-md bg-white/90 backdrop-blur-2xl rounded-[2rem] shadow-2xl border border-white/40 p-8">
        <div className="flex justify-center">
          <div className="h-16 w-16 rounded-3xl bg-gradient-to-br from-cyan-500 via-blue-600 to-violet-700 text-white flex items-center justify-center shadow-xl">
            <LockKeyhole size={32} />
          </div>
        </div>

        <h1 className="text-4xl font-black text-center mt-6 bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-700 bg-clip-text text-transparent">
          Reset Password
        </h1>

        <p className="text-center text-slate-600 mt-2">
          Create a new secure password for your account.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-bold text-slate-700">
              New Password
            </label>

            <div className="relative mt-1">
              <ShieldCheck
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500"
              />

              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="New password"
                value={password}
                onChange={(e) => updatePassword(e.target.value)}
                className="w-full border rounded-2xl pl-12 pr-12 py-3 outline-none focus:ring-4 focus:ring-blue-200"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {passwordStrength && (
              <div className="mt-2">
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${strengthBar}`}
                  />
                </div>

                <p className={`text-xs font-semibold mt-1 ${strengthColor}`}>
                  Password Strength: {passwordStrength}
                </p>
              </div>
            )}
          </div>

          <div>
            <label className="text-sm font-bold text-slate-700">
              Confirm Password
            </label>

            <div className="relative mt-1">
              <LockKeyhole
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500"
              />

              <input
                type={showConfirmPassword ? "text" : "password"}
                required
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border rounded-2xl pl-12 pr-12 py-3 outline-none focus:ring-4 focus:ring-blue-200"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            {confirmPassword && password !== confirmPassword && (
              <p className="text-xs text-red-600 font-semibold mt-2">
                Passwords do not match
              </p>
            )}

            {confirmPassword && password === confirmPassword && (
              <p className="text-xs text-emerald-600 font-semibold mt-2">
                Passwords match
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-700 text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 disabled:opacity-60 shadow-lg hover:scale-[1.02] transition-all duration-300"
          >
            <Sparkles size={18} />
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>

        <Link
          to="/login"
          className="mt-5 flex items-center justify-center gap-2 text-sm font-semibold text-blue-600"
        >
          <ArrowLeft size={16} />
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ResetPassword;