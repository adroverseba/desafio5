// const product = require("./bbdd");
// import { productos } from "./bbdd.mjs";

const express = require("express");
const app = express();
const PORT = 8080;

const routerProductos = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/productos", routerProductos);

app.use("/static", express.static("public"));

/**++++++++++++++++++++++++++++++++++++++++++ */
const products = [
  {
    title: "teclado",
    price: "5000",
    thumbnail: "https://redragon.es/products/best-seller/shiva-k512/",
    id: 1,
  },
  {
    title: "mouse",
    price: "3000",
    thumbnail: "https://redragon.es/products/mouse/impact987/",
    id: 2,
  },
  {
    title: "mesa gaming",
    price: "700000",
    thumbnail: "https://redragon.es/products/mesasGamer/sMesaGamerx/",
    id: 3,
  },
];

routerProductos.get("/", (req, res) => {
  res.json(products);
});

routerProductos.get("/:id", (req, res) => {
  const { id } = req.params;
  const producto = products.find((prod) => prod.id == id);

  if (!producto) res.status(404).send();

  res.json(producto);
});

routerProductos.post("/", (req, res) => {
  const { title, price, thumbnail } = req.body;
  const producto = {
    title,
    price,
    thumbnail,
    id: products.length + 1,
  };
  products.push(producto);
  res.json(producto);
});

routerProductos.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, price, thumbnail } = req.body;

  const productFind = products.some((producto) => producto.id == id);
  if (productFind) {
    products.map((prod) => {
      if (prod.id == id) {
        prod.title = title ? title : prod.title;
        prod.price = price ? price : prod.price;
        prod.thumbnail = thumbnail ? thumbnail : prod.thumbnail;
      }
      return prod;
    });
    res.send(products[id - 1]);
  } else {
    res.status(404).json({ error: "Producto no encontrado" });
  }
});

routerProductos.delete("/:id", (req, res) => {
  const { id } = req.params;
  const productFind = products.some((prod) => prod.id == id);
  if (productFind) {
    products.splice(id - 1, 1);
    products.map((p, i) => (p.id = i + 1));
    return res.send({ estado: "elemento eliminado con exito" });
  }
  res.status(404).json({ error: "Producto no encontrado" });
});

/**++++++++++++++++++++++++++++++++++++++++++++++ */
// Server Listen
const server = app.listen(PORT, () => {
  console.log(`Servidor conectado en ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en el server:${error}`));
