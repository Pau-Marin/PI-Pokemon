import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getAllPokemons,
  getAllTypes,
  createPokemon,
} from "../../redux/actions";

function validate(input) {
  let errors = {};
  const validateName = /^[a-z]+$/;
  const validateNum = /^\d+$/;
  const validateUrl = /^(ftp|http|https):\/\/[^ "]+$/;

  // Nombre
  if (!validateName.test(input.name))
    errors.name = "El nombre solo puede contener letras";
  if (!input.name) errors.name = "Se requiere un nombre";

  // Imagen
  if (input.img && !validateUrl.test(input.img))
    errors.img = "La imagen debe tener una URL válida";

  // HP
  if (!input.hp) errors.hp = "Se requiere una cantidad de vida";
  if (!validateNum.test(input.hp)) errors.hp = "Introduce la vida en números";
  if (input.hp < 0) errors.hp = "La vida no puede ser negativa";
  if (input.hp === "0") errors.hp = "La vida no puede ser 0";
  if (input.hp > 200) errors.hp = "La vida no puede ser superior a 200";

  // ATK
  if (!input.attack) errors.attack = "Se requiere una cantidad de ataque";
  if (!validateNum.test(input.attack))
    errors.attack = "Introduce el ataque en números";
  if (input.attack < 0) errors.attack = "El ataque no puede ser negativo";
  if (input.attack === "0") errors.attack = "El ataque no puede ser 0";
  if (input.attack > 200)
    errors.attack = "El ataque no puede ser superior a 200";

  // DEF
  if (!input.defense) errors.defense = "Se requiere una cantidad de defensa";
  if (!validateNum.test(input.defense))
    errors.defense = "Introduce la defensa en números";
  if (input.defense < 0) errors.defense = "La defensa no puede ser negativa";
  if (input.defense === "0") errors.defense = "La defensa no puede ser 0";
  if (input.defense > 200)
    errors.defense = "La defensa no puede ser superior a 200";

  // SPD
  if (!input.speed) errors.speed = "Se requiere una cantidad de velocidad";
  if (!validateNum.test(input.speed))
    errors.speed = "Introduce la velocidad en números";
  if (input.speed < 0) errors.speed = "La velocidad no puede ser negativa";
  if (input.speed === "0") errors.speed = "La velocidad no puede ser 0";
  if (input.speed > 200)
    errors.speed = "La velocidad no puede ser superior a 200";

  // Altura
  if (!input.height) errors.height = "Se requiere un peso";
  if (!validateNum.test(input.height))
    errors.height = "Introduce el peso en números";
  if (input.height < 0) errors.height = "El peso no puede ser negativo";
  if (input.height === "0") errors.height = "El peso no puede ser 0";
  if (input.height > 200)
    errors.height =
      "Lo sentimos, actualmente no aceptamos pokemons de más de 200Kg. Nuestra infraestructura es pequeña y no entraría en la base de datos.";

  // Peso
  if (!input.weight) errors.weight = "Se requiere una altura";
  if (!validateNum.test(input.weight))
    errors.weight = "Introduce la altura en números";
  if (input.weight < 0) errors.weight = "La altura no puede ser negativa";
  if (input.weight === "0") errors.weight = "La altura no puede ser 0";
  if (input.weight > 200)
    errors.weight =
      "Lo sentimos, actualmente no aceptamos pokemons de más de 2m. Nuestra infraestructura es pequeña y no entraría en la base de datos.";

  return errors;
}

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

  function handleInputChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
    setErrors(validate({ ...input, [e.target.name]: e.target.value }));

    setDisabledButton(
      errors.name &&
        errors.img &&
        errors.hp &&
        errors.attack &&
        errors.defense &&
        errors.speed &&
        errors.types &&
        errors.height &&
        errors.weight
    );
  }

  function handleCheckBox(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        types: [...input.types, e.target.value],
      });

      setErrors(
        validateCheckBox({
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
        validateCheckBox({
          ...input,
          types: input.types.filter((t) => t !== e.target.value),
        })
      );
    }

    setDisabledButton(
      errors.name &&
        errors.img &&
        errors.hp &&
        errors.attack &&
        errors.defense &&
        errors.speed &&
        errors.types &&
        errors.height &&
        errors.weight
    );
  }

  function validateCheckBox(input) {
    let errors = {};

    if (!input.types.length) {
      errors.types = "El Pokemon debe tener al menos 1 tipo";
    }
    if (input.types.length > 2) {
      errors.types = "Los Pokemon no pueden tener más de 2 tipos";
    }

    return errors;
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
      {errors.name && <p className="error">{errors.name}</p>}

      <label>Imagen del Pokemon:</label>
      <input
        type="text"
        value={input.img}
        onChange={handleInputChange}
        name="img"
        placeholder="Imagen del Pokemon"
      ></input>
      {errors.img && <p className="error">{errors.img}</p>}

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
        {errors.hp && <p className="error">{errors.hp}</p>}

        <label>ATK:</label>
        <input
          type="text"
          value={input.attack}
          onChange={handleInputChange}
          name="attack"
          placeholder="Ataque del Pokemon"
        ></input>
        {errors.attack && <p className="error">{errors.attack}</p>}

        <label>DEF:</label>
        <input
          type="text"
          value={input.defense}
          onChange={handleInputChange}
          name="defense"
          placeholder="Defensa del Pokemon"
        ></input>
        {errors.defense && <p className="error">{errors.defense}</p>}

        <label>SPD:</label>
        <input
          type="text"
          value={input.speed}
          onChange={handleInputChange}
          name="speed"
          placeholder="Velocidad del Pokemon"
        ></input>
        {errors.speed && <p className="error">{errors.speed}</p>}
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
                      onChange={handleCheckBox}
                      name={t.name}
                    />
                    {t.name}
                  </label>
                </li>
              );
          })}
        </ul>
        {errors.types && <p className="error">{errors.types}</p>}
      </div>

      <div className="form_size">
        <h3>Tamaño</h3>
        <label>Height (cm):</label>
        <input
          type="text"
          value={input.height}
          onChange={handleInputChange}
          name="height"
          placeholder="Altura del Pokemon"
        ></input>
        {errors.height && <p className="error">{errors.height}</p>}

        <label>Weight (Kg):</label>
        <input
          type="text"
          value={input.weight}
          onChange={handleInputChange}
          name="weight"
          placeholder="Peso del Pokemon"
        ></input>
        {errors.weight && <p className="error">{errors.weight}</p>}
      </div>
      <button type="submit" disabled={disabledButton}>
        ¡Crear!
      </button>
    </form>
  );
}
