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
const { getPokemons } = require("./src/middlewares/middleware");
async function startSetup() {
  await getPokemons(0, 1154);
}
startSetup();

// La base de datos se actualiza automaticamente cada 24h
const INTERVALO_ACTUALIZACION_BBDD = 24;
setInterval(() => {
  startSetup();
}, INTERVALO_ACTUALIZACION_BBDD * 60 * 60 * 1000);
