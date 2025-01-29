import React, { useState } from "react";
import styled from "styled-components";

function Auth({ isLoggedIn, setIsLoggedIn, setUsername }) {
  const [isSignup, setIsSignup] = useState(false); // Toggle between Login & Signup
  const [username, setLocalUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState({}); // Simulated database (username -> password)

  const handleAuth = () => {
    if (!username.trim() || !password.trim()) {
      setError("Username and password cannot be empty.");
      return;
    }

    if (isSignup) {
      // Signup logic
      if (users[username]) {
        setError("Username already exists. Try logging in.");
      } else {
        setUsers({ ...users, [username]: password }); // Store new user
        setIsSignup(false);
        setError("Account created successfully! Please login.");
      }
    } else {
      // Login logic
      if (users[username] === password) {
        setUsername(username);
        setIsLoggedIn(true);
        setError("");
      } else {
        setError("Invalid username or password.");
      }
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setLocalUsername("");
    setPassword("");
    setError("");
  };

  return (
    <AuthStyled>
      <div className="auth-form">
        {!isLoggedIn ? (
          <>
            <h2>{isSignup ? "Create Account" : "Login"}</h2>
            {error && <p className="error">{error}</p>}
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setLocalUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleAuth}>{isSignup ? "Sign Up" : "Login"}</button>
            <p onClick={() => setIsSignup(!isSignup)} className="toggle">
              {isSignup ? "Already have an account? Login" : "Don't have an account? Signup"}
            </p>
          </>
        ) : (
          <>
            <h2>Welcome, {username}!</h2>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </AuthStyled>
  );
}

const AuthStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #e1bee7, #c5cae9);

  /* Ensure the auth-form is centered */
  .auth-form {
    background: #fff;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
    text-align: center;
    width: 100%;
    max-width: 400px; /* Limit form size */
    box-sizing: border-box; /* Ensure padding is part of width */
    transition: all 0.3s ease-in-out;

    h2 {
      font-size: 1.8rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: #333;
    }

    .error {
      color: #ff4d4d;
      font-size: 0.9rem;
      margin-bottom: 1rem;
      font-weight: 500;
    }

    input {
      width: 100%;
      padding: 1rem;
      margin-bottom: 1.5rem;
      border: 1px solid #ddd;
      border-radius: 10px;
      font-size: 1rem;
      transition: all 0.3s ease;

      &:focus {
        border-color: #4caf50;
        outline: none;
        box-shadow: 0 0 5px rgba(76, 175, 80, 0.3);
      }
    }

    button {
      width: 100%;
      padding: 1rem;
      background-color: #4caf50;
      color: white;
      font-size: 1.1rem;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      transition: background-color 0.3s ease, transform 0.2s ease;

      &:hover {
        background-color: #45a049;
        transform: scale(1.05);
      }

      &:active {
        transform: scale(0.98);
      }
    }

    .toggle {
      color: #007bff;
      cursor: pointer;
      margin-top: 10px;
      text-decoration: underline;
      font-size: 0.95rem;
    }

    .logout-btn {
      background-color: #d9534f;
      color: white;
      padding: 1rem;
      width: 100%;
      font-size: 1.1rem;
      border-radius: 10px;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #c9302c;
      }
    }
  }
`;

export default Auth;


