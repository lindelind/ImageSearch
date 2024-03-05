
import { NavLink } from "react-router-dom";

export const Navigation = () => {
  return (
    <>
      <nav>
        <NavLink to={"/"}>Start</NavLink>
        <NavLink to={"/favorites"}>Mina favoriter</NavLink>
      </nav>
    </>
  );
};