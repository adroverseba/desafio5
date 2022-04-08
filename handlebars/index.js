const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const PORT = 8080;

const routerProductos = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine(
  "hbs",
  engine({
    extname: "hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials/",
  })
);

app.set("view engine", "hbs");
app.set("views", "./views");

app.use("/api/productos", routerProductos);

app.use("/static", express.static("public"));

/**++++++++++++++++++++++++++++++++++++++++++ */
const products = [
  {
    title: "teclado",
    price: "5000",
    thumbnail:
      "https://gorilagames.com/img/Public/1019-producto-redragon-kumara-red-76.jpg",
    id: 1,
  },
  {
    title: "mouse",
    price: "3000",
    thumbnail:
      "https://http2.mlstatic.com/D_NQ_NP_648202-MLA44079102059_112020-O.jpg",
    id: 2,
  },
  {
    title: "auricular gaming",
    price: "7000",
    thumbnail:
      "https://mexx-img-2019.s3.amazonaws.com/Auricular-Gamer-Redragon-Zeus-H510-Rgb_41187_1.jpeg",
    id: 3,
  },
];

app.get("/", (req, res) => {
  res.render("products");
});

app.get("/productos/vista", (req, res) => {
  res.render("products", { products });
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
  res.redirect("/productos/vista");
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
