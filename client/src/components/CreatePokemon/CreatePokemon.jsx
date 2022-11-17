import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTypes } from "../../redux/actions";

// export function validate(input) {
//   let error = {};
//   if (!input.username) {
//     error.username = "Username is required";
//   } else if (!/\S+@\S+\.\S+/.test(input.name)) {
//     error.username = "Username is invalid";
//   }

//   if (!input.password) {
//     error.password = "password is required";
//   } else if (!/(?=.-*[0-9])/.test(input.password)) {
//     error.password = "Password is invalid";
//   }

//   return error;
// }

export default function CreatePokemon() {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);

  useEffect(() => {
    dispatch(getAllTypes());
  }, [dispatch]);

  // const [types, setTypes] = useState(0);
  // const [error, setError] = React.useState({});
  const [input, setInput] = React.useState({
    name: "",
    hp: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    type1: "",
    type2: "",
    height: 0,
    weight: 0,
  });

  let handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });

    // let objError = validate({ ...input, [e.target.name]: e.target.value });
    // setError(objError);
  };

  return (
    <form>
      <h1>Esto es Crear Pokemon</h1>
      <label>Nombre del Pokemon:</label>
      <input
        type="text"
        value={input.name}
        onChange={handleInputChange}
        name="name"
        placeholder="Nombre del Pokemon"
      ></input>
      <div>
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
          name="atk"
          placeholder="Ataque del Pokemon"
        ></input>
        <label>DEF:</label>
        <input
          type="text"
          value={input.defense}
          onChange={handleInputChange}
          name="def"
          placeholder="Defensa del Pokemon"
        ></input>
        <label>SPD:</label>
        <input
          type="text"
          value={input.speed}
          onChange={handleInputChange}
          name="spd"
          placeholder="Velocidad del Pokemon"
        ></input>
      </div>
      <div>
        <h3>Tipos</h3>
        <select>
          {types.map((t) => {
            return t.name !== "unknown" ? (
              <option value={t.name} key={t.name}>
                {t.name}
              </option>
            ) : null;
          })}
        </select>
      </div>
      <div>
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
    </form>
  );
}
