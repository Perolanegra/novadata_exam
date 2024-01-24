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
      console.log('i don get here controller');
      return res.send(postsArr);
    } catch (e) {
      return res.status(500).send({
        friendly: "Não foi possível retornar as Postagens.",
        err: { message: e.message, name: e.name },
      });
    }
  },

  async getByCategoryId(req, res) {
    const postData = req.body;
    try {
      const posts = await Posts.find({ category_id: { $in: postData.category_id } });
      return res.send(posts);
    } catch (error) {
      return res.status(500).send({
        friendly:
          "Não foi possível retornar as postagens referente a categoria passada.",
        err: { message: e.message, name: e.name },
      });
    }
  },

  async getByUserId(req, res) {
    const postData = req.body;
    try {
      const posts = await Posts.find({ author_id: { $in: postData.author_id } });
      return res.send(posts);
    } catch (error) {
      return res.status(500).send({
        friendly:
          "Não foi possível retornar as postagens referente ao usuário.",
        err: { message: e.message, name: e.name },
      });
    }
  },
};
