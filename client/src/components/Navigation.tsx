
import { NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import searchimg from "../img/search.png";
import heartimg from "../img/favorite.png"

export const Navigation = () => {
   const { isAuthenticated, user } = useAuth0();
  
  return (
    <nav
      className={`navigation ${isAuthenticated ? "logged-in" : "not-logged-in"}`}
    >
      {isAuthenticated ? (
        <>
          <LogoutButton />
          <div className="user-container">
            <p className="user">
              Inloggad som <b>{user?.nickname}</b>{" "}
              <NavLink to={"/"}>
                <img className="user-img" src={searchimg} alt="user" />
              </NavLink>
              <NavLink to={"/favorites"}>
                <img className="favorites-img" src={heartimg} alt="user" />
              </NavLink>
            </p>
          </div>
        </>
      ) : (
        ""
      )}
    </nav>
  );
};
