const User = require("../models/User");

module.exports = {
  saveProduct: async (req, res) => {
    const { id } = req.params;
    const productId = id;

    try {
      const user = await User.findByIdAndUpdate(
        req.user._id,
        //Cuando se usa push, el objectId se guarda en el array tantas veces como se llame al endpoint
        // { $push: { products: productId } },+
        //Por el contrario, el méotodo addToSet solo lo añade si la id no existe dentro del array
        { $addToSet: { products: productId } },
        // el atributo new de configuración, permite devolver el objeto una vez ha sido actualizado cuando se poner a true (por defecto, mongodb devuelve el objeto antiguo)
        { new: true }
      ).populate({
        // El "deep populate" permite acceder una relación dentro de un objeto ya populado, es decir, permite popular en varios niveles.
        // el path hace referencia al nombre del atributo que contiene el/los objectId(s)
        path: "products",
        // model hace referencia al modelo sobre el que se implementará el populate.
        model: "Product",
        // El parametro populate permite bajar un nivel (en este caso user.products.createdBy, que nos devolverá el usuario que ha creado el objeto a partir de un producto que ha guardado un usuario cualquier)
        populate: {
          path: "createdBy",
          model: "User",
          // El parámetro select permite flitrar que elementos queremos recibir. Se puede utilizar en cualquier nivel.
          select: "username email"
        }
      });

      res.json({ user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error" });
    }
  }
};
