import React from "react";
import { Link } from "react-router-dom";

export default function PokeLanding() {
  return (
    <div className="landing">
      <h1>Está será la landing page chupi-guay</h1>
      <Link to="/home">
        <button>¡Entrar!</button>
      </Link>
    </div>
  );
}
