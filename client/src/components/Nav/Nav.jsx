import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Nav extends Component {
  render() {
    return (
      <nav>
        <Link to={"/home"}>Home</Link>
        <Link to={"/createPokemon"}>Crear Pokemon</Link>
      </nav>
    );
  }
}
