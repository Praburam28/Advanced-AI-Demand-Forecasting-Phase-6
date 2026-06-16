import { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Camera,
  Save,
  Shield,
  Sparkles,
  Eye,
  EyeOff,
} from "lucide-react";

const Profile = () => {
  const savedUser = JSON.parse(localStorage.getItem("user")) || {};

  const [profile, setProfile] = useState({
    name: savedUser.name || "Forecast User",
    email: savedUser.email || "user@forecastai.com",
    currentPassword: "",
    newPassword: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...savedUser,
        name: profile.name,
        email: profile.email,
      })
    );

    alert("Profile updated successfully");
  };

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-violet-700 via-fuchsia-600 to-cyan-500 p-8 text-white shadow-2xl shadow-fuchsia-500/30">
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute bottom-0 left-20 h-56 w-56 rounded-full bg-cyan-300/25 blur-3xl" />

        <div className="relative flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                profile.name
              )}&background=7c3aed&color=fff&size=160`}
              alt="Profile avatar"
              className="w-32 h-32 rounded-full border-4 border-white/40 shadow-2xl"
            />

            <button className="absolute bottom-1 right-1 bg-white text-violet-700 p-3 rounded-full shadow-lg">
              <Camera size={18} />
            </button>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 border border-white/20 px-4 py-2 rounded-full text-sm font-bold backdrop-blur-xl">
              <User size={16} />
              Profile Settings
            </div>

            <h1 className="text-4xl lg:text-5xl font-black mt-4">
              {profile.name}
            </h1>

            <p className="text-white/80 mt-2">
              Manage your account information, security, password and preferences.
            </p>

            <div className="mt-4 flex items-center gap-2 text-emerald-100 font-semibold">
              <Shield size={18} />
              Verified Account
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-600 p-6 text-white shadow-xl">
          <User size={32} />
          <h3 className="font-black text-xl mt-4">Personal Info</h3>
          <p className="text-sm text-white/75 mt-2">
            Update your name and account profile details.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-cyan-500 p-6 text-white shadow-xl">
          <Shield size={32} />
          <h3 className="font-black text-xl mt-4">Security</h3>
          <p className="text-sm text-white/75 mt-2">
            Manage password and account security settings.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 to-rose-500 p-6 text-white shadow-xl">
          <Sparkles size={32} />
          <h3 className="font-black text-xl mt-4">Preferences</h3>
          <p className="text-sm text-white/75 mt-2">
            Customize your SaaS dashboard experience.
          </p>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-xl font-black text-slate-900 dark:text-white">
          Personal Information
        </h3>

        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Update your account name and email address.
        </p>

        <div className="grid md:grid-cols-2 gap-5 mt-6">
          <div>
            <label className="text-sm font-bold text-slate-700 dark:text-slate-200">
              Full Name
            </label>

            <div className="relative mt-2">
              <User
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-500"
              />

              <input
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="input pl-12"
                placeholder="Enter full name"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-bold text-slate-700 dark:text-slate-200">
              Email Address
            </label>

            <div className="relative mt-2">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-500"
              />

              <input
                name="email"
                type="email"
                value={profile.email}
                onChange={handleChange}
                className="input pl-12"
                placeholder="Enter email address"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-xl font-black text-slate-900 dark:text-white">
          Change Password
        </h3>

        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Update your password to keep your account secure.
        </p>

        <div className="grid md:grid-cols-2 gap-5 mt-6">
          <div>
            <label className="text-sm font-bold text-slate-700 dark:text-slate-200">
              Current Password
            </label>

            <div className="relative mt-2">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500"
              />

              <input
                type={showCurrentPassword ? "text" : "password"}
                name="currentPassword"
                value={profile.currentPassword}
                onChange={handleChange}
                className="input pl-12 pr-12"
                placeholder="Current password"
              />

              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
              >
                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm font-bold text-slate-700 dark:text-slate-200">
              New Password
            </label>

            <div className="relative mt-2">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500"
              />

              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                value={profile.newPassword}
                onChange={handleChange}
                className="input pl-12 pr-12"
                placeholder="New password"
              />

              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="btn-primary mt-6 flex items-center gap-2"
        >
          <Save size={18} />
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Profile;