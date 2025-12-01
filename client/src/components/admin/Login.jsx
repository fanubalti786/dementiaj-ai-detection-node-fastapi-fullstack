import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useUserStore from "../../store/userStore";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const setUser = useUserStore((state) => state.setUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const { data } = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        setUser(data.user);
        toast("Login successful!");
        navigate("/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className="w-full max-w-sm p-4 border rounded-lg border-primary/30 
      shadow-xl shadow-primary/15"
      >
        <div className="flex flex-col">
          <div className="p-4 pt-8 text-center">
            <h1 className="text-3xl font-bold">
              <span className="text-primary">Admin </span>Login
            </h1>
            <p className="font-light">
              Enter your credentials to access the admin panel
            </p>
          </div>

          <div onSubmit={handleSubmit} className="mt-6 text-gray-600 p-2">
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

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

            <div className="flex flex-col mb-6">
              <label>Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="your password"
                className="border-b-2 border-gray-300 p-2 outline-none"
                required
              />
            </div>

            <button
              onClick={handleSubmit}
              type="button"
              disabled={loading}
              className="w-full py-3 font-medium bg-primary rounded text-white cursor-pointer hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <span
                  onClick={() => navigate("/signup")}
                  className="text-primary cursor-pointer hover:underline"
                >
                  Sign up here
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
