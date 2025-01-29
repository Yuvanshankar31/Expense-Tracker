import React from "react";
import styled from "styled-components";
import avatar from "../../img/avatar.png";
import { menuItems } from "../../utils/menuItems";
import { useNavigate } from "react-router-dom";

function Navigation({ active, setActive, isLoggedIn, setIsLoggedIn, username }) {
  const navigate = useNavigate();

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Clear stored authentication token
    setIsLoggedIn(false);
    navigate("/"); // Redirect to login page
  };

  return (
    <NavStyled>
      <div className="user-con">
        <img src={avatar} alt="User Avatar" />
        <div className="text">
          <h2>{username ? `Welcome, ${username}` : "Welcome, User"}</h2>
          <p>Your Money</p>
        </div>
      </div>
      <ul className="menu-items">
        {menuItems.map((item) => (
          <li
            key={item.id}
            onClick={() => setActive(item.id)}
            className={active === item.id ? "active" : ""}
          >
            {item.icon}
            <span>{item.title}</span>
          </li>
        ))}
      </ul>
      <div className="bottom-nav">
        <button className="sign-out" onClick={handleLogout}>Sign Out</button>
      </div>
    </NavStyled>
  );
}

// Styled Components
const NavStyled = styled.nav`
  padding: 2.5rem 2rem;
  width: 380px;
  height: 100%;
  background: rgba(252, 246, 249, 0.95);
  border: 2px solid #f1f1f1;
  backdrop-filter: blur(6px);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  .user-con {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    transition: transform 0.3s ease-in-out;

    &:hover {
      transform: scale(1.05);
    }

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      background: #fcf6f9;
      border: 2px solid #fff;
      padding: 0.2rem;
      box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }

    .text {
      h2 {
        color: rgba(34, 34, 96, 1);
        font-size: 1.4rem;
        font-weight: 500;
        transition: color 0.3s ease;

        &:hover {
          color: #222260;
        }
      }

      p {
        color: rgba(34, 34, 96, 0.7);
      }
    }
  }

  .menu-items {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    li {
      display: flex;
      align-items: center;
      font-weight: 500;
      padding: 0.8rem 1.5rem;
      border-radius: 10px;
      cursor: pointer;
      color: rgba(34, 34, 96, 0.7);
      transition: all 0.3s ease;
      position: relative;
      gap: 1rem;

      span {
        font-size: 1.1rem;
        color: rgba(34, 34, 96, 0.8);
      }

      &:hover {
        background-color: rgba(34, 34, 96, 0.1);
        color: rgba(34, 34, 96, 1);
      }

      &.active {
        background-color: rgba(34, 34, 96, 0.2);
        color: rgba(34, 34, 96, 1);

        &::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          width: 4px;
          height: 100%;
          background: #222260;
          border-radius: 0 10px 10px 0;
        }
      }
    }
  }

  .bottom-nav {
    display: flex;
    justify-content: center;
    padding-top: 1.5rem;

    .sign-out {
      padding: 0.8rem 2rem;
      background-color: #ff4d4d;
      color: white;
      font-size: 1.1rem;
      font-weight: 600;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      transition: background-color 0.3s ease, transform 0.2s ease;

      &:hover {
        background-color: #e60000;
      }

      &:active {
        transform: scale(0.98);
      }
    }
  }
`;

export default Navigation;

