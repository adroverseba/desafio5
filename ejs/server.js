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

/**++++++++++++++++++++++++++++++++++++++++++ */

// routerProductos.get("/:id", (req, res) => {
//   const { id } = req.params;
//   const producto = products.find((prod) => prod.id == id);

//   if (!producto) res.status(404).send();

//   res.json(producto);
// });

// routerProductos.post("/", (req, res) => {
//   const { title, price, thumbnail } = req.body;
//   const producto = {
//     title,
//     price,
//     thumbnail,
//     id: products.length + 1,
//   };
//   products.push(producto);
//   res.redirect("/productos/vista");
// });

// routerProductos.put("/:id", (req, res) => {
//   const { id } = req.params;
//   const { title, price, thumbnail } = req.body;

//   const productFind = products.some((producto) => producto.id == id);
//   if (productFind) {
//     products.map((prod) => {
//       if (prod.id == id) {
//         prod.title = title ? title : prod.title;
//         prod.price = price ? price : prod.price;
//         prod.thumbnail = thumbnail ? thumbnail : prod.thumbnail;
//       }
//       return prod;
//     });
//     res.send(products[id - 1]);
//   } else {
//     res.status(404).json({ error: "Producto no encontrado" });
//   }
// });

/**++++++++++++++++++++++++++++++++++++++++++++++ */
// Server Listen

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor conectado en ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en el server:${error}`));
