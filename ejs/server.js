const express = require("express");
const app = express();

//codificacion
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//configuracion de Router
const routerProductos = require("./routes/api");
app.use("/api/productos", routerProductos);

//configuracion de motor de plantillas EJS
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("public"));

/**++++++++++++++++++++++++++++++++++++++++++++++ */
// Server Listen

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor conectado en ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en el server:${error}`));
