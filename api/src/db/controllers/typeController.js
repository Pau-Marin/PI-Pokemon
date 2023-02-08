const { Type } = require("../db")

module.exports = {
  addType: async function (type) {
    if (!type) throw new Error("No me mandaste tipos de Pokemon para añadir!")

    let tp = await Type.findOrCreate({
      where: { name: type.name },
      defaults: type,
      raw: true,
    })

    return { data: tp, msg: `Tipo ${tp.name} añadido correctamente` }
  },

  listTypesDb: async function () {
    let results = await Type.findAll({ raw: true })
    return {
      data: results,
      msg: `Actualmente hay ${results.length} tipos de Pokemon en la base de datos`,
    }
  },
}
