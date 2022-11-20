import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Nav() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" ? (
        <nav className="navBar">
          <Link to={"/home"}>Home</Link>
          <Link to={"/createPokemon"}>Crear Pokemon</Link>
        </nav>
      ) : null}
    </>
  );
}
