const express = require("express");
const app = express();

// ddbb
const Container = require("../ddbb/clase-Container");
const contenedor = new Container({ fileName: "products" });

// API routes
const routerProducts = express.Router();

routerProducts.get("/", (req, res) => {
  async function obtener() {
    productos = await contenedor.getAll();
    res.send(productos);
  }
  obtener();
  // contenedor.getAll().then((products) => {
  //   res.send(products);
  // });
});

routerProducts.get("/:id", (req, res) => {
  const { id } = req.params;
  contenedor.getById(id).then((result) => res.send(result));
});

routerProducts.post("/", (req, res) => {
  const newProd = req.body;
  contenedor.save(newProd).then((result) => res.send(result));
});

routerProducts.put("/:id", (req, res) => {
  const { id } = req.params;
  const productModify = req.body;
  contenedor.modifyById(id, productModify).then((result) => res.send(result));
});

routerProducts.delete("/:id", (req, res) => {
  const { id } = req.params;
  contenedor.deleteById(id).then((result) => res.send(result));
});

module.exports = routerProducts;
