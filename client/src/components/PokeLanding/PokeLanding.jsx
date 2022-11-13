import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Landing extends Component {
  render() {
    return (
      <div className="searchBar">
        <h1>Está será la landing page chupi-guay</h1>
        <Link to="/home">
          <button>¡Entrar!</button>
        </Link>
      </div>
    );
  }
}
