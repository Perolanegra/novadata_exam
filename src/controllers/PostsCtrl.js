const mongoose = require("mongoose");

const Posts = mongoose.model("Posts");

module.exports = {
  async store(req, res) {
    // requisição que insere o post.
    const postData = req.body;
    try {
      const posts = await Posts.create(postData);
      return res.send(posts);
    } catch (e) {
      return res.status(500).send({
        friendly: "Não foi possível adicionar o post.",
        err: { message: e.message, name: e.name },
      });
    }
  },

  async getAll(req, res) {
    try {
      const postsArr = await Posts.find();
      return res.send(postsArr);
    } catch (e) {
      return res.status(400).send({
        err: { message: "Não foi possível retornar as Postagens.", e },
      });
    }
  }
};
