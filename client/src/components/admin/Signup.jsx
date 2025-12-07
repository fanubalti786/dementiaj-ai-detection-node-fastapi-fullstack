import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Signup() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [avatarError, setAvatarError] = useState(""); // Error state for avatar

  // Yup Schema
  const schema = Yup.object().shape({
    fullName: Yup.string()
      .required("Full Name is required")
      .min(3, "Full Name must be at least 3 characters"),
    email: Yup.string().required("Email is required").email("Invalid email"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[A-Z])(?=.*\d).+$/,
        "Password must contain at least one capital letter and one number"
      ),
    avatar: Yup.mixed().required("Avatar is required"),
  });

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setAvatarError(""); // Clear avatar error when a file is selected
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");  // Clear previous error
    setAvatarError(""); // Clear avatar error

    try {
      // Validate form using Yup
      await schema.validate({ fullName, email, password, avatar });

      if (!avatar) {
        setAvatarError("Avatar is required"); // Manually set avatar error if not selected
        return;
      }

      setLoading(true);

      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("avatar", avatar);
      formData.append("type", "user");

      const response = await fetch(
        "http://localhost:3000/api/v1/user/register",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Signup successful!");
        navigate("/login");
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      if (err.name === "ValidationError") {
        setError(err.message);
      } else {
        setError("An error occurred. Please try again.");
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen py-8">
      <div className="w-full max-w-sm p-4 border rounded-lg border-primary/30 shadow-xl shadow-primary/15">
        <div className="flex flex-col">
          <div className="p-4 pt-8 text-center">
            <h1 className="text-3xl font-bold">
              <span className="text-primary">User </span>Signup
            </h1>
            <p className="font-light">Create your account to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 text-gray-600 p-2">
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            {/* Avatar */}
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full border-2 border-gray-300 overflow-hidden mb-3 bg-gray-100">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Avatar preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg
                      className="w-12 h-12"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <label className="cursor-pointer bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-all">
                Choose Avatar
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
              {avatarError && (
                <div className="text-red-500 mt-2 text-sm">{avatarError}</div>
              )}
            </div>

            {/* Full Name */}
            <div className="flex flex-col mb-6">
              <label>Full Name</label>
              <input
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
                type="text"
                placeholder="Your full name"
                className="border-b-2 border-gray-300 p-2 outline-none"
                required
              />
            </div>

            {/* Email */}
            <div className="flex flex-col mb-6">
              <label>Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="your email id"
                className="border-b-2 border-gray-300 p-2 outline-none"
                required
              />
            </div>

            {/* Password */}
            <div className="flex flex-col mb-6">
              <label>Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="your password (min 8 chars, 1 capital, 1 number)"
                className="border-b-2 border-gray-300 p-2 outline-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 font-medium bg-primary rounded text-white cursor-pointer hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/login")}
                  className="text-primary cursor-pointer hover:underline"
                >
                  Login here
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
