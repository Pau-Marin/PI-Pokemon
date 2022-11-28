import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getAllPokemons, getAllTypes } from "../../redux/actions/index";

import "./PokeLanding.css";

import logo from "../../img/logo.png";

export default function PokeLanding() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);
  const types = useSelector((state) => state.types);
  const pokemons = useSelector((state) => state.pokemons);

  useEffect(() => {
    dispatch(getAllPokemons());
    dispatch(getAllTypes());
  }, [dispatch]);

  return (
    <div className="landing">
      <img className="logo" src={logo} alt="PIkemon logo" />

      {error ? (
        <>
          <div className="error">
            <h1>Vaya, parece que ha habido un error</h1>
            <p>Estoy trabajando para arreglarlo lo antes possible.</p>
          </div>
        </>
      ) : (
        <Link to="/home">
          <button className="ui">¡Entrar!</button>
        </Link>
      )}
    </div>
  );
}
