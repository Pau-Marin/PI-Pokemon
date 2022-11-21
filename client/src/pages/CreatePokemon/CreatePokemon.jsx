import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getAllPokemons,
  getAllTypes,
  createPokemon,
} from "../../redux/actions";

import validate from "./validate";

import Nav from "../../components/Nav/Nav";
import { typeIcons } from "../../components/PokeTypes/icons";

import defaultImage from "../../img/CreatePokemon_img_alt.gif";

import "./CreatePokemon.css";
import "../../components/PokeTypes/PokeTypes.css";

export default function CreatePokemon() {
  const dispatch = useDispatch();
  const history = useHistory();
  const types = useSelector((state) => state.types);
  const [errors, setErrors] = useState({});
  const [disabledButton, setDisabledButton] = useState(true);

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
    types: [],
    height: 0,
    weight: 0,
  });

  function handleInputChange(e, inputType) {
    if (inputType === "checkBox") {
      handleCheckBox(e);
    } else {
      e.preventDefault();
      setInput({ ...input, [e.target.name]: e.target.value });
      setErrors(validate({ ...input, [e.target.name]: e.target.value }));
    }

    if (
      errors?.name === undefined &&
      errors?.img === undefined &&
      errors?.hp === undefined &&
      errors?.attack === undefined &&
      errors?.defense === undefined &&
      errors?.speed === undefined &&
      errors?.types === undefined &&
      errors?.height === undefined &&
      errors?.weight === undefined
    ) {
      setDisabledButton(true);
    } else {
      setDisabledButton(false);
    }
  }

  function handleCheckBox(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        types: [...input.types, e.target.value],
      });

      setErrors(
        validate({
          ...input,
          types: [...input.types, e.target.value],
        })
      );
    } else if (!e.target.checked) {
      setInput({
        ...input,
        types: input.types.filter((t) => t !== e.target.value),
      });

      setErrors(
        validate({
          ...input,
          types: input.types.filter((t) => t !== e.target.value),
        })
      );
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
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
      types: [],
      height: 0,
      weight: 0,
    });
    history.push("/home");
  }

  return (
    <div className="formBackground">
      <Nav />
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Crea tu pokemon</h1>
          <div className="firstBlock">
            <label className="fieldName">Nombre del Pokemon:</label>
            <input
              type="text"
              value={input.name}
              onChange={handleInputChange}
              name="name"
              placeholder="Nombre del Pokemon"
            ></input>
            {errors.name && <p className="error">{errors.name}</p>}

            <label className="fieldName">Imagen del Pokemon:</label>
            <input
              type="text"
              value={input.img}
              onChange={handleInputChange}
              name="img"
              placeholder="Imagen del Pokemon"
            ></input>
            {errors.img && <p className="error">{errors.img}</p>}
          </div>
          {input.img ? (
            <img className="formImage" src={`${input.img}`} />
          ) : (
            <img className="formImage" src={defaultImage} />
          )}

          <div className="form_stats">
            <h3>Estadísticas</h3>
            <div className="form_stats_container">
              <div className="form_stats_container_1">
                <label className="statFieldName">HP:</label>
                <input
                  type="text"
                  value={input.hp}
                  onChange={handleInputChange}
                  name="hp"
                  placeholder="Vida del Pokemon"
                ></input>
                {errors.hp && <p className="error">{errors.hp}</p>}

                <label className="statFieldName">ATK:</label>
                <input
                  type="text"
                  value={input.attack}
                  onChange={handleInputChange}
                  name="attack"
                  placeholder="Ataque del Pokemon"
                ></input>
                {errors.attack && <p className="error">{errors.attack}</p>}
              </div>

              <div className="form_stats_container_2">
                <label className="statFieldName">DEF:</label>
                <input
                  type="text"
                  value={input.defense}
                  onChange={handleInputChange}
                  name="defense"
                  placeholder="Defensa del Pokemon"
                ></input>
                {errors.defense && <p className="error">{errors.defense}</p>}

                <label className="statFieldName">SPD:</label>
                <input
                  type="text"
                  value={input.speed}
                  onChange={handleInputChange}
                  name="speed"
                  placeholder="Velocidad del Pokemon"
                ></input>
                {errors.speed && <p className="error">{errors.speed}</p>}
              </div>
            </div>
          </div>

          <div className="form_types">
            <h3>Tipos</h3>
            <div className="form_types_list">
              {types.map((t) => {
                if (t.name !== "Unknown" && t.name !== "Shadow")
                  return (
                    <label key={t.name}>
                      <input
                        type="checkbox"
                        value={t.name}
                        onChange={(e) => handleInputChange(e, "checkBox")}
                        name={t.name}
                      />
                      <img
                        className={`icon ${t.name.toLowerCase()}`}
                        src={typeIcons[t.name.toLowerCase()]}
                      />
                      {t.name}
                    </label>
                  );
              })}
            </div>
            {errors.types && <p className="error">{errors.types}</p>}
          </div>

          <div className="form_size">
            <h3>Tamaño</h3>
            <label className="statFieldName">Height (cm):</label>
            <input
              type="text"
              value={input.height}
              onChange={handleInputChange}
              name="height"
              placeholder="Altura del Pokemon"
            ></input>
            {errors.height && <p className="error">{errors.height}</p>}

            <label className="statFieldName">Weight (Kg):</label>
            <input
              type="text"
              value={input.weight}
              onChange={handleInputChange}
              name="weight"
              placeholder="Peso del Pokemon"
            ></input>
            {errors.weight && <p className="error">{errors.weight}</p>}
          </div>
          <button
            className={`${disabledButton ? "" : "ui"}`}
            type="submit"
            disabled={disabledButton && "disabled"}
          >
            ¡Crear!
          </button>
        </form>
      </div>
    </div>
  );
}
