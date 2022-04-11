const express = require("express");
const app = express();
const PORT = 8080;
const routerProductos = require("./routes/api"); //requiero al Router

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/productos", routerProductos); //configuro Router
app.use("/static", express.static("public"));

/**++++++++++++++++++++++++++++++++++++++++++++++ */
// Server Listen
const server = app.listen(PORT, () => {
  console.log(`Servidor conectado en ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en el server:${error}`));
