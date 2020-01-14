const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    require: [true, { message: "User is required" }]
  },
  email: {
    type: String,
    require: [true, { message: "email is required" }]
  },
  password: {
    type: String,
    require: [true, { message: "password is required" }]
  },
  name: {
    type: String,
    require: [true, { message: "name is required" }]
  },
  status: {
    type: String,
    enum: ["Pending", "Active"],
    default: "Pending"
  },
  confirmationCode: {
    type: String
  },
  // products, en este caso, será un array de ObjectIds. Es por ello que se pone el objeto objectId entre corchetes.
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
