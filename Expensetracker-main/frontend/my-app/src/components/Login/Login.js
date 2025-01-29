// import React, { useState } from "react";
// import styled from "styled-components";


// function Login({ setIsLoggedIn, setUsername }) {
//   const [username, setLocalUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = () => {
//     // Simple login validation (replace with real authentication)
//     if (username === "user" && password === "password") {
//       setUsername(username);  // Set the username in the parent App component
//       setIsLoggedIn(true); // Set login status to true
//     } else {
//       alert("Invalid credentials");
//     }
//   };

//   return (
//     <LoginStyled>
//       <div className="login-form">
//         <h2>Login</h2>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setLocalUsername(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button onClick={handleLogin}>Login</button>
//       </div>
//     </LoginStyled>
//   );
// }

// const LoginStyled = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
//   background: #f0f0f0;

//   .login-form {
//     background: #fff;
//     padding: 2rem;
//     border-radius: 10px;
//     box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//     text-align: center;
//     width: 300px;

//     h2 {
//       margin-bottom: 1rem;
//     }

//     input {
//       width: 100%;
//       padding: 0.8rem;
//       margin-bottom: 1rem;
//       border: 1px solid #ddd;
//       border-radius: 5px;
//     }

//     button {
//       width: 100%;
//       padding: 1rem;
//       background-color: #4caf50;
//       color: white;
//       border: none;
//       border-radius: 5px;
//       cursor: pointer;

//       &:hover {
//         background-color: #45a049;
//       }
//     }
//   }
// `;

// export default Login;


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
            <h2>{isSignup ? "Signup" : "Login"}</h2>
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
  background: #f0f0f0;

  .auth-form {
    background: #fff;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    width: 300px;

    h2 {
      margin-bottom: 1rem;
    }

    .error {
      color: red;
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }

    input {
      width: 100%;
      padding: 0.8rem;
      margin-bottom: 1rem;
      border: 1px solid #ddd;
      border-radius: 5px;
    }

    button {
      width: 100%;
      padding: 1rem;
      background-color: #4caf50;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;

      &:hover {
        background-color: #45a049;
      }
    }

    .toggle {
      color: #007bff;
      cursor: pointer;
      margin-top: 10px;
      text-decoration: underline;
    }

    .logout-btn {
      background-color: #d9534f;

      &:hover {
        background-color: #c9302c;
      }
    }
  }
`;

export default Auth;

