import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/index";

import logo from "../../img/logo.png";

import PokeCard from "../PokeCard/PokeCard";

export class Home extends Component {
  componentDidMount() {
    this.props.getAllPokemons();
  }

  render() {
    return (
      <div className="home">
        <h1>Esto es la Home</h1>
        <img src={logo} alt="PIkemon logo" />
        {this.props.pokemons?.map((p) => {
          return (
            <PokeCard
              key={p.id}
              id={p.id}
              name={p.name}
              img={p.img}
              stats={p.stats}
              types={p.types}
            />
          );
        })}
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    pokemons: state.pokemons,
  };
};

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
