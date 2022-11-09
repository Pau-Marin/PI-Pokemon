import React, { Component } from "react";

import logo from "../../img/logo.png";

export default class Home extends Component {
  render() {
    return (
      <div className="home">
        <h1>Esto es la Home</h1>
        <img src={logo} alt="PIkemon logo" />
      </div>
    );
  }
}
