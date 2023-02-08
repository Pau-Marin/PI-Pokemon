const { DataTypes } = require("sequelize")
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "pokemon_types",
    {
      typeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      pokemonId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: false }
  )
}
