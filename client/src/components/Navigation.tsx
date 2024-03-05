import { useState } from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import userimg from "../img/user.png";


export const Navigation = () => {
   const { isAuthenticated, user } = useAuth0();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav
      className={`navigation ${isAuthenticated ? "logged-in" : "not-logged-in"}`}
    >
      {isAuthenticated ? (
        <>
          <LogoutButton />
          <div className="user-container">
            <p
              className={`user ${showDropdown ? "clicked" : ""}`}
              onClick={handleDropdownToggle}
            >
              Inloggad som <b>{user?.name}</b>{" "}
              <img className="userimg" src= {userimg} alt="user" />
            </p>
            {showDropdown && (
              <div className="dropdown-content">
                <NavLink to={"/"}>Start</NavLink>
                <br />
                <NavLink to={"/favorites"}>Favoriter</NavLink>
              </div>
            )}
          </div>
        </>
      ) : (
        ""
      )}
    </nav>
  );
};
