import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchPokemonByName } from "../../redux/actions";

import "./PokeSearch.css";

export default function PokeSearch() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(searchPokemonByName(name));
    setName("");
  }

  return (
    <div className="searchBar">
      <input
        type="text"
        placeholder="Search pokemon"
        onChange={(e) => handleInputChange(e)}
      />
      <button
        className="ui searchBarItem"
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        Search
      </button>
    </div>
  );
}
