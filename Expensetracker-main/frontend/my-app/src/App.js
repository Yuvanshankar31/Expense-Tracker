import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import bg from "./img/bg.png";
import { MainLayout } from "./styles/Layouts";
import Orb from "./components/Orb/Orb";
import Navigation from "./components/Navigation/Navigation";
import Dashboard from "./components/Dashboard/Dashboard";
import Income from "./components/Income/Income";
import Expenses from "./components/Expenses/Expenses";
import Login from "./components/Login/Login"; 
import { useGlobalContext } from "./context/globalContext";

// Styled Component for App
const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${(props) => props.bg});
  position: relative;

  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
  }
`;

function App() {
  const [active, setActive] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const global = useGlobalContext();
  console.log(global);

  // Memoize the Orb component
  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  return (
    <Router>
      <AppStyled bg={bg} className="App">
        {orbMemo}
        <MainLayout>
          {!isLoggedIn ? (
            <Routes>
              <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />} />
            </Routes>
          ) : (
            <>
              {/* Pass username and sign-out function to Navigation */}
              <Navigation 
                active={active} 
                setActive={setActive} 
                isLoggedIn={isLoggedIn} 
                setIsLoggedIn={setIsLoggedIn} 
                username={username} 
              />
              <main>
                {/* Conditional rendering based on active state */}
                {active === 1 && <Dashboard />}
                {active === 2 && <Dashboard />}
                {active === 3 && <Income />}
                {active === 4 && <Expenses />}
                <div className="user-info">
                </div>
              </main>
            </>
          )}
        </MainLayout>
      </AppStyled>
    </Router>
  );
}

export default App;

