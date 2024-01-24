const mongoose = require("mongoose");
const Users = mongoose.model("Users");

module.exports = {
  async store(req, res) {
    // requisição que insere o user.
    const postData = req.body;
    try {
      const user = await Users.create(postData);
      return res.send(user);
    } catch (e) {
      return res.status(500).send({
        friendly: "Não foi possível cadastrar o Usuário.",
        err: { message: e.message, name: e.name },
      });
    }
  },
};
