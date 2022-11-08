//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn } = require("./src/db/db.js");

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log("Server is listening at 3001"); // eslint-disable-line no-console
  });
});

// Actualizando BBDD con la API al arrancar el servidor.
const {
  getPokemonsFromAPI,
  getTypesFromAPI,
} = require("./src/middlewares/middleware");

async function startSetup() {
  let date = new Date();
  let month =
    date.getMonth().toString().length < 2
      ? "0" + date.getMonth()
      : date.getMonth();

  let day =
    date.getDate().toString().length < 2
      ? "0" + date.getDate()
      : date.getDate();

  let hours =
    date.getHours().toString().length < 2
      ? "0" + date.getHours()
      : date.getHours();

  let minutes =
    date.getMinutes().toString().length < 2
      ? "0" + date.getMinutes()
      : date.getMinutes();

  let seconds =
    date.getSeconds().toString().length < 2
      ? "0" + date.getSeconds()
      : date.getSeconds();

  console.log(
    `Updating database on ${date.getFullYear()}-${month}-${day} ${hours}:${minutes}:${seconds}`
  );

  let types = await getTypesFromAPI();
  let pokemons = await getPokemonsFromAPI();

  Promise.all([types, pokemons]).then((p) => {
    console.log(
      `Database up-to-date on ${date.getFullYear()}-${month}-${day} ${hours}:${minutes}:${seconds}`
    );
  });
}

startSetup();

// La base de datos se actualiza automaticamente cada 24h
const INTERVALO_ACTUALIZACION_BBDD = 24;
setInterval(() => {
  startSetup();
}, INTERVALO_ACTUALIZACION_BBDD * 60 * 60 * 1000);
