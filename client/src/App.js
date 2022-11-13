import "./App.css";

import React from "react";
import { Route } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import PokeLanding from "./components/PokeLanding/PokeLanding";
import Home from "./components/Home/Home";
import PokeInfo from "./components/PokeInfo/PokeInfo";
import CreatePokemon from "./components/CreatePokemon/CreatePokemon";

function App() {
  return (
    <div>
      <Route path={"/"} render={() => <Nav />} />
      <Route exact path={"/"} render={() => <PokeLanding />} />
      <Route exact path={"/home"} render={() => <Home />} />
      <Route exact path={"/pokemon"} render={() => <PokeInfo />} />
      <Route exact path={"/createPokemon"} render={() => <CreatePokemon />} />
    </div>
  );
}

export default App;
