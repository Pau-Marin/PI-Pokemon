import "./App.css";

import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import * as actions from "./redux/actions";

import Nav from "./components/Nav/Nav";
import PokeLanding from "./components/PokeLanding/PokeLanding";
import Home from "./components/Home/Home";
import PokeInfo from "./components/PokeInfo/PokeInfo";
import CreatePokemon from "./components/CreatePokemon/CreatePokemon";

export class App extends Component {
  componentDidMount() {
    this.props.getAllPokemons();
  }

  onFilter(pokeId) {
    let pokemon = this.props.pokemons?.filter((p) => p.id === parseInt(pokeId));
    if (pokemon.length > 0) {
      return pokemon[0];
    } else {
      return null;
    }
  }

  render() {
    return (
      <div>
        <Route path={"/"} render={() => <Nav />} />
        <Route exact path={"/"} render={() => <PokeLanding />} />
        <Route exact path={"/home"} render={() => <Home />} />
        <Route
          exact
          path={"/pokemon/:id"}
          render={({ match }) => (
            <PokeInfo pokemon={this.onFilter(match.params.id)} />
          )}
        />
        <Route exact path={"/createPokemon"} render={() => <CreatePokemon />} />
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
