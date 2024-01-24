const mongoose = require("mongoose");

const Categories = mongoose.model("Categories");

module.exports = {
  async store(req, res) {
    // requisição que insere a categoria.
    const postData = req.body;
    try {
      const category = await Categories.create(postData);
      return res.send(category);
    } catch (e) {
      return res.status(500).send({
        friendly: "Não foi possível adicionar a categoria.",
        err: { message: e.message, name: e.name }
      });
    }
  },
};
