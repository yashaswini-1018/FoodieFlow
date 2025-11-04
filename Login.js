import React, { useState } from "react";

function Login({ setUser, setView }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [forgotMode, setForgotMode] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const found = users.find(
      (u) => u.email === form.email && u.password === form.password
    );

    if (found) {
      localStorage.setItem("loggedInUser", found.name);
      setUser(found.name);
      alert("Login successful!");
      setView("home");
    } else {
      alert("Invalid credentials!");
    }
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex((u) => u.email === resetEmail);

    if (userIndex === -1) {
      alert("Email not found!");
      return;
    }

    users[userIndex].password = newPassword;
    localStorage.setItem("users", JSON.stringify(users));
    alert("Password reset successful! You can now log in.");
    setForgotMode(false);
  };

  return (
    <div className="feedback-form">
      {!forgotMode ? (
        <>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <button type="submit">Login</button>
          </form>

          <p
            style={{
              textAlign: "center",
              color: "blue",
              cursor: "pointer",
              marginTop: "8px",
            }}
            onClick={() => setForgotMode(true)}
          >
            Forgot Password?
          </p>

          <p style={{ textAlign: "center", marginTop: "10px" }}>
            Don’t have an account?{" "}
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => setView("register")}
            >
              Register here
            </span>
          </p>
        </>
      ) : (
        <>
          <h2>Reset Password</h2>
          <form onSubmit={handleResetPassword}>
            <input
              type="email"
              placeholder="Enter your registered email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button type="submit">Reset Password</button>
          </form>

          <p
            style={{
              textAlign: "center",
              color: "blue",
              cursor: "pointer",
              marginTop: "10px",
            }}
            onClick={() => setForgotMode(false)}
          >
            Back to Login
          </p>
        </>
      )}
    </div>
  );
}

export default Login;
