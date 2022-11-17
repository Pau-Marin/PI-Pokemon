import "./App.css";

import React from "react";

import { Route } from "react-router-dom";

import Nav from "./components/Nav/Nav";
import PokeLanding from "./components/PokeLanding/PokeLanding";
import Home from "./components/Home/Home";
import PokeInfo from "./components/PokeInfo/PokeInfo";
import CreatePokemon from "./components/CreatePokemon/CreatePokemon";

export default function App() {
  return (
    <div>
      <Route path={"/"} component={Nav} />
      <Route exact path={"/"} component={PokeLanding} />
      <Route exact path={"/home"} component={Home} />
      <Route exact path={"/pokemon/:id"} component={PokeInfo} />
      <Route exact path={"/createPokemon"} component={CreatePokemon} />
    </div>
  );
}
