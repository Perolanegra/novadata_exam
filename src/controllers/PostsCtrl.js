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
      const page = req.query.page ? parseInt(req.query.page) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit) : 2;
      // Considera o limite e a página passada.
      const skip = (page - 1) * limit;
      const postsArr = await Posts.find().skip(skip).limit(limit);
      return res.send(postsArr);
    } catch (e) {
      return res.status(500).send({
        friendly: "Não foi possível retornar as Postagens.",
        err: { message: e.message, name: e.name },
      });
    }
  },

  async getByCategoryId(req, res) {
    const idCategory = req.query.category_id;
    try {
      const posts = await Posts.find({
        category_id: { $in: idCategory },
      });
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
    const idAuthor = req.query.author_id;
    try {
      const posts = await Posts.find({
        author_id: { $in: idAuthor },
      });
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
