import "./App.css"

import React from "react"

import { Route } from "react-router-dom"

import PokeLanding from "./pages/PokeLanding/PokeLanding"
import Home from "./pages/Home/Home"
import PokeInfo from "./pages/PokeInfo/PokeInfo"
import CreatePokemon from "./pages/CreatePokemon/CreatePokemon"

import "./App.css"

export default function App() {
  return (
    <div className="app">
      <Route exact path={"/"} component={PokeLanding} />
      <Route exact path={"/home"} component={Home} />
      <Route exact path={"/pokemon/:id"} component={PokeInfo} />
      <Route exact path={"/createPokemon"} component={CreatePokemon} />
    </div>
  )
}
