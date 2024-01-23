const express = require("express");
const routes = express.Router();

const CategoriesCtrl = require("./controllers/CategoriesCtrl");
const PostsCtrl = require("./controllers/PostsCtrl");
const UsersCtrl = require("./controllers/UsersCtrl");

const cacheMiddleware = require("./middlewares/CacheMiddleware");
const cm = new cacheMiddleware();
/** Endpoints **/

/** Endpoints categories */
routes.post("/categories/store", cm.cacheVerify, CategoriesCtrl.store);
/** Fim categories */

/** Endpoints posts */
routes.get("/posts", cm.cacheVerify, PostsCtrl.getAll);
routes.post("/posts", cm.cacheVerify, PostsCtrl.store);
/** Fim posts */

/** Endpoints Usuário */
routes.get("/user", cm.cacheVerify, UsersCtrl.getAll);
routes.get("/user/authenticate", cm.cacheVerify, UsersCtrl.getById);
routes.post("/user/register", cm.cacheVerify, UsersCtrl.store);
/** Fim Usuário */

module.exports = routes;
