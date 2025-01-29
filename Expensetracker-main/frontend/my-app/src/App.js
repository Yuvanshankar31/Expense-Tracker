import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import bg from './img/bg.png';
import { MainLayout } from './styles/Layouts';
import Orb from "./components/Orb/Orb";
import Navigation from "./components/Navigation/Navigation";
import Dashboard from "./components/Dashboard/Dashboard";
import Income from "./components/Income/Income";
import Expenses from "./components/Expenses/Expenses";
import Login from "./components/Login/Login"; 
import { useGlobalContext } from "./context/globalContext";

function App() {
  const [active, setActive] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [username, setUsername] = useState(""); // State to store the username

  const global = useGlobalContext();
  console.log(global);

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Dashboard />;
      case 3:
        return <Income />;
      case 4:
        return <Expenses />;
      default:
        return <Dashboard />;
    }
  };

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  

  return (
    <Router>
      <AppStyled bg={bg} className="App">
        {orbMemo}
        <MainLayout>
          {/* Conditional rendering based on login status */}
          {!isLoggedIn ? (
            <Routes>
              <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />} />
            </Routes>
          ) : (
            <>
              <Navigation active={active} setActive={setActive} />
              <main>
                {displayData()}
                {/* Display username and add sign-out button */}
                <div className="user-info">
                  <span>Welcome, {username}!</span>
                  
                </div>
              </main>
            </>
          )}
        </MainLayout>
      </AppStyled>
    </Router>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
  }

  .user-info {
    text-align: center;
    margin-top: 20px;
    span {
      display: block;
      font-size: 1.2rem;
      margin-bottom: 10px;
    }
    button {
      padding: 0.8rem 1.5rem;
      background-color: #ff4d4d;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;

      &:hover {
        background-color: #e60000;
      }
    }
  }
`;

export default App;
