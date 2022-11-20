import React from "react";
import { Link, useLocation } from "react-router-dom";

import "./Nav.css";

export default function Nav() {
  const location = useLocation();

  return (
    <nav className="navBar">
      <Link to={"/home"}>Home</Link>
      <Link to={"/createPokemon"}>Crear Pokemon</Link>
    </nav>
  );
}
