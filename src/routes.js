const express = require("express");
const routes = express.Router();
const multer = require("multer");

const CategoriesCtrl = require("./controllers/CategoriesCtrl");
const PostsCtrl = require("./controllers/PostsCtrl");
const UsersCtrl = require("./controllers/UsersCtrl");

const CacheMiddleware = require("./middlewares/CacheMiddleware");
const cm = new CacheMiddleware({ cache: {} });
const pCtrl = new PostsCtrl();

const storage = multer.diskStorage({
  destination: "imgs/", // Specify the destination folder
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original filename
  },
});
const upload = multer({ storage: storage });
/** Endpoints **/

/** Endpoints categories */
routes.post("/categories/store", CategoriesCtrl.store);
/** Fim categories */

/** Endpoints posts */
routes.get("/posts", cm.cacheVerify, pCtrl.getAll);
routes.get("/posts/user", cm.cacheVerify, pCtrl.getByUserId);
routes.get("/posts/category", cm.cacheVerify, pCtrl.getByCategoryId);
routes.post("/posts", upload.single("image"), pCtrl.store);
/** Fim posts */

/** Endpoints Usuário */
routes.post("/user", UsersCtrl.store);
/** Fim Usuário */

module.exports = routes;
