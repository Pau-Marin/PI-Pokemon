import React from "react";
import { Link, useLocation } from "react-router-dom";

import "./Nav.css";

export default function Nav() {
  const location = useLocation();

  return (
    <nav className="navBar">
      <Link className="ui navBarItem" to={"/home"}>
        Home
      </Link>
      <Link className="ui navBarItem" to={"/createPokemon"}>
        Crear Pokemon
      </Link>
    </nav>
  );
}
