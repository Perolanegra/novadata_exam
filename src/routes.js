const express = require("express");
const routes = express.Router();

const CategoriesCtrl = require("./controllers/CategoriesCtrl");
const PostsCtrl = require("./controllers/PostsCtrl");
const UsersCtrl = require("./controllers/UsersCtrl");

const CacheMiddleware = require("./middlewares/CacheMiddleware");
const cm = new CacheMiddleware({ cache: {} });
/** Endpoints **/

/** Endpoints categories */
routes.post("/categories/store", CategoriesCtrl.store);
/** Fim categories */

/** Endpoints posts */
routes.get("/posts", cm.cacheVerify, PostsCtrl.getAll);
routes.get("/posts/user", cm.cacheVerify, PostsCtrl.getByUserId);
routes.get("/posts/category", cm.cacheVerify, PostsCtrl.getByCategoryId);
routes.post("/posts", PostsCtrl.store);
/** Fim posts */

/** Endpoints Usuário */
routes.post("/user", UsersCtrl.store);
/** Fim Usuário */

module.exports = routes;
