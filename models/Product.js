const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    require: [true, { message: "name is required" }]
  },
  description: {
    type: String,
    require: [true, { message: "description is required" }]
  },
  //el objeto createdBy es de tipo ObjectId y el atributo ref hace uso del modelo User (en este caso)
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

// el string "Product" es la referencia de este modelo.
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
