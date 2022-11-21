export default function validate(input) {
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

  // Tipos
  if (!input.types.length)
    errors.types = "El Pokemon debe tener al menos 1 tipo";

  if (input.types.length > 2)
    errors.types = "Los Pokemon no pueden tener más de 2 tipos";

  // Altura
  if (!input.height) errors.height = "Se requiere un peso";
  if (!validateNum.test(input.height))
    errors.height = "Introduce el peso en números";
  if (input.height < 0) errors.height = "El peso no puede ser negativo";
  if (input.height === "0") errors.height = "El peso no puede ser 0";
  if (input.height > 200)
    errors.height =
      "Lo sentimos, actualmente no aceptamos pokemons de más de 2m. Nuestra infraestructura es pequeña y no entraría en la base de datos.";

  // Peso
  if (!input.weight) errors.weight = "Se requiere una altura";
  if (!validateNum.test(input.weight))
    errors.weight = "Introduce la altura en números";
  if (input.weight < 0) errors.weight = "La altura no puede ser negativa";
  if (input.weight === "0") errors.weight = "La altura no puede ser 0";
  if (input.weight > 200)
    errors.weight =
      "Lo sentimos, actualmente no aceptamos pokemons de más de 200Kg. Nuestra infraestructura es pequeña y no entraría en la base de datos.";

  return errors;
}
