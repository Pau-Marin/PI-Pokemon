import React from "react";
import { Link } from "react-router-dom";

import "./PokeLanding.css";

import logo from "../../img/logo.png";

export default function PokeLanding() {
  return (
    <div className="landing">
      <img className="logo" src={logo} alt="PIkemon logo" />
      <Link to="/home">
        <button>¡Entrar!</button>
      </Link>
    </div>
  );
}
