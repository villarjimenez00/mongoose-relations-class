const Product = require("../models/Product");

module.exports = {
  new: async (req, res) => {
    console.log("new product");
    const { name, description } = req.body;

    try {
      const product = new Product({
        name,
        description,
        createdBy: req.user._id
      });

      await product.save();

      res.json({ product });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error" });
    }
  },
  getById: async (req, res) => {
    const { id } = req.params;

    try {
      // Hacemos un populate de createdBy para mostrar el objeto entero del usuario que ha creado el producto.
      // En este caso, que es el caso simple, se introduce como string el nombre del atributo que queramos "popular"

      const product = await Product.findById(id).populate("createdBy");

      res.json({ product });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }
};
