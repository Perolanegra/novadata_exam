const express = require('express');
const routes = express.Router();

const CategoriesCtrl = require('./controllers/CategoriesCtrl');
const PostsCtrl = require('./controllers/PostsCtrl');
const UsersCtrl = require('./controllers/UsersCtrl');
/** Endpoints **/

/** Endpoints Pedido */
routes.post('/categories/store', CategoriesCtrl.store);
/** Fim Pedido */

/** Endpoints Estabelecimento */
routes.get('/establishments', PostsCtrl.getAll);
routes.post('/establishments/store', PostsCtrl.store);
/** Fim Estabelecimento */

/** Endpoints Usuário */
routes.get('/user', UsersCtrl.getAll);
routes.get('/user/authenticate', UsersCtrl.getById);
routes.post('/user/register', UsersCtrl.store);
/** Fim Usuário */


module.exports = routes;