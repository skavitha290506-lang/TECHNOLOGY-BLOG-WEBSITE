
import React, { useState } from "react";
import "./Login.css";

const API = import.meta.env.VITE_API_URL;

function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!sessionStorage.getItem("token")
  );

  const [userName, setUserName] = useState(() => {
    const user = JSON.parse(sessionStorage.getItem("user") || "null");
    return user ? user.name : "";
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Please wait...");

    try {
      const url = isRegister
        ? `${API}/api/auth/register`
        : `${API}/api/auth/login`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(
          isRegister ? { name, email, password } : { email, password }
        )
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Something went wrong");
        return;
      }

      if (isRegister) {
        setMessage("Registration successful! Please login.");
        setIsRegister(false);
        setName("");
        setPassword("");
      } else {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("user", JSON.stringify(data.user));

        setUserName(data.user.name);
        setIsLoggedIn(true);
        setMessage("");

        window.dispatchEvent(new Event("authChanged"));
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (error) {
      console.error("Login Error:", error);
      setMessage("Backend connection failed. Check server.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    setIsLoggedIn(false);
    setUserName("");
    setEmail("");
    setPassword("");
    setMessage("Logged out successfully!");

    window.dispatchEvent(new Event("authChanged"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="login-section" id="login">
      <div className="login-container">
        <div className="login-icon">TN</div>

        <span className="login-label">YOUR TECHNOVA ACCOUNT</span>

        {isLoggedIn ? (
          <div className="login-content">
            <h2>Welcome, <span>{userName}!</span></h2>
            <p>You are successfully logged in to TechNova.</p>

            <button type="button" onClick={handleLogout}>
              Logout →
            </button>
          </div>
        ) : (
          <>
            <h2>{isRegister ? "Create Your Account" : "Welcome Back"}</h2>

            <p className="login-description">
              {isRegister
                ? "Join TechNova and explore the world of technology."
                : "Sign in to continue exploring technology and innovation."}
            </p>

            <form onSubmit={handleSubmit}>
              {isRegister && (
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              )}

              <input
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="6"
              />

              <button type="submit">
                {isRegister ? "Create Account →" : "Login →"}
              </button>
            </form>

            <div className="login-switch">
              <span>
                {isRegister
                  ? "Already have an account?"
                  : "New to TechNova?"}
              </span>

              <button
                type="button"
                onClick={() => {
                  setIsRegister(!isRegister);
                  setMessage("");
                }}
              >
                {isRegister ? "Login" : "Register"}
              </button>
            </div>
          </>
        )}

        {message && <p className="login-message">{message}</p>}
      </div>
    </section>
  );
}

export default Login;
