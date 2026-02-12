import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { login, isAuthenticated } from "../../services/authService";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionExpired = searchParams.get("expired") === "1";

  // Redirect if already authenticated (and not landing from session expired)
  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/admin", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await login({ email, password });

      if (response.success) {
        localStorage.setItem("authToken", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        if (response.refreshToken) {
          localStorage.setItem("refreshToken", response.refreshToken);
        }

        navigate("/admin");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black relative flex items-center justify-center">
      {/* Background Image */}
      <img
        src="https://res.cloudinary.com/dybv1h20q/image/upload/v1769927519/bg_do9pwv.png"
        className="absolute inset-0 opacity-30 w-full h-full object-cover"
        alt="background"
      />

      {/* Glass Effect Overlay */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/40"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-8 md:p-10 shadow-2xl">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img
              src="https://res.cloudinary.com/dybv1h20q/image/upload/v1770745345/IMG_0950_xstvv3.png"
              alt="Ratsch Productions"
              className="w-32 md:w-40"
            />
          </div>

          {/* Title */}
          <h1 className="text-white text-3xl md:text-4xl font-bold uppercase text-center mb-2">
            Admin Login
          </h1>
          <p className="text-white/70 text-sm md:text-base text-center mb-8">
            Enter your credentials to access the admin panel
          </p>

          {/* Session expired message */}
          {sessionExpired && !error && (
            <div className="mb-6 p-3 bg-amber-900/30 border border-amber-500/50 rounded-md">
              <p className="text-amber-200 text-sm text-center">
                Your session expired. Please log in again.
              </p>
            </div>
          )}
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3 bg-red-900/30 border border-red-500/50 rounded-md">
              <p className="text-red-300 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-white text-sm md:text-base uppercase mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border hover:cursor-text border-[#333333] hover:border-[#FF0000] focus:border-[#FF0000] transition-all duration-500 rounded-md py-3 md:py-4 bg-[#333333] w-full focus:ring-0 focus:outline-none px-4 text-white text-sm md:text-base placeholder-white/50"
                placeholder="your email here"
                disabled={loading}
              />
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-white text-sm md:text-base uppercase mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border hover:cursor-text border-[#333333] hover:border-[#FF0000] focus:border-[#FF0000] transition-all duration-500 rounded-md py-3 md:py-4 bg-[#333333] w-full focus:ring-0 focus:outline-none px-4 text-white text-sm md:text-base placeholder-white/50"
                placeholder="your password here"
                disabled={loading}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full border border-white hover:border-[#FF0000] transition-all duration-300 py-4 md:py-5 text-white text-sm md:text-base lg:text-lg uppercase font-semibold rounded-md hover:bg-[#FF0000]/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Footer Text */}
          <p className="text-white/50 text-xs text-center mt-6">
            Ratsch Productions © {new Date().getFullYear()}{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
