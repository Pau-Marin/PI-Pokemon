import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Nav extends Component {
  render() {
    return (
      <div>
        <Link to={"/"}>Home</Link>
        <Link to={"/types"}>Tipos</Link>
        <Link to={"/createPokemon"}>Crear Pokemon</Link>
      </div>
    );
  }
}