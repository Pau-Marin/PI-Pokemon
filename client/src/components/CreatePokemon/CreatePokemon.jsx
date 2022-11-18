import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getAllPokemons,
  getAllTypes,
  createPokemon,
} from "../../redux/actions";

export default function CreatePokemon() {
  const dispatch = useDispatch();
  const history = useHistory();
  const types = useSelector((state) => state.types);

  useEffect(() => {
    dispatch(getAllTypes());
  }, []);

  const [input, setInput] = useState({
    name: "",
    img: "",
    hp: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    type1: "",
    type2: "",
    height: 0,
    weight: 0,
  });

  function handleInputChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
    console.log(input);
  }

  function handleCheck(e) {
    if (e.target.checked) {
      if (input.type1 && input.type2) {
        console.log("Un Pokemon no puede tener más de 2 tipos.");
      }

      if (!input.type1 && !input.type2) {
        setInput({ ...input, type1: e.target.value });
      }
      if (!input.type1) setInput({ ...input, type1: e.target.value });
      if (!input.type2) setInput({ ...input, type2: e.target.value });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
    dispatch(createPokemon(input));
    dispatch(getAllPokemons());
    alert("Pokemon creado");
    setInput({
      name: "",
      img: "",
      hp: 0,
      attack: 0,
      defense: 0,
      speed: 0,
      type1: "",
      type2: "",
      height: 0,
      weight: 0,
    });
    history.push("/home");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1>Crea tu pokemon</h1>
      <label>Nombre del Pokemon:</label>
      <input
        type="text"
        value={input.name}
        onChange={handleInputChange}
        name="name"
        placeholder="Nombre del Pokemon"
      ></input>
      <label>Imagen del Pokemon:</label>
      <input
        type="text"
        value={input.img}
        onChange={handleInputChange}
        name="img"
        placeholder="Imagen del Pokemon"
      ></input>
      <div className="form_stats">
        <h3>Estadísticas</h3>
        <label>HP:</label>
        <input
          type="text"
          value={input.hp}
          onChange={handleInputChange}
          name="hp"
          placeholder="Vida del Pokemon"
        ></input>
        <label>ATK:</label>
        <input
          type="text"
          value={input.attack}
          onChange={handleInputChange}
          name="attack"
          placeholder="Ataque del Pokemon"
        ></input>
        <label>DEF:</label>
        <input
          type="text"
          value={input.defense}
          onChange={handleInputChange}
          name="defense"
          placeholder="Defensa del Pokemon"
        ></input>
        <label>SPD:</label>
        <input
          type="text"
          value={input.speed}
          onChange={handleInputChange}
          name="speed"
          placeholder="Velocidad del Pokemon"
        ></input>
      </div>
      <div className="form_types">
        <h3>Tipos</h3>
        <ul className="form_types_list">
          {types.map((t) => {
            if (t.name !== "Unknown")
              return (
                <li key={t.name}>
                  <label>
                    <input
                      type="checkbox"
                      value={t.name}
                      onChange={handleCheck}
                      name={t.name}
                    />
                    {t.name}
                  </label>
                </li>
              );
          })}
        </ul>
      </div>
      <div className="form_size">
        <h3>Tamaño</h3>
        <label>Height:</label>
        <input
          type="text"
          value={input.height}
          onChange={handleInputChange}
          name="height"
          placeholder="Altura del Pokemon"
        ></input>
        <label>Weight:</label>
        <input
          type="text"
          value={input.weight}
          onChange={handleInputChange}
          name="weight"
          placeholder="Peso del Pokemon"
        ></input>
      </div>
      <button type="submit">¡Crear!</button>
    </form>
  );
}
