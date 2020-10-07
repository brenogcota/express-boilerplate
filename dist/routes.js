"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _UserController = require('./app/controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _SessionController = require('./app/controllers/SessionController'); var _SessionController2 = _interopRequireDefault(_SessionController);
var _ToolsController = require('./app/controllers/ToolsController'); var _ToolsController2 = _interopRequireDefault(_ToolsController);

//import authMiddleware from './app/middlewares/auth';

const routes = new (0, _express.Router)();

routes.get('/', (req, res) => {
   return res.sendFile('views/index.html', {root: __dirname })
});

routes.get('/tools', _ToolsController2.default.index);
routes.post('/tools', _ToolsController2.default.store);
routes.get('/tools/:id', _ToolsController2.default.show);
routes.put('/tools/:id', _ToolsController2.default.update);
routes.delete('/tools/:id', _ToolsController2.default.destroy);

routes.post('/users', _UserController2.default.store);
routes.post('/sessions', _SessionController2.default.store);


/*
 * ** Auth Middleware **
 * Remove this comment  to enable auth middleware
 *
 */
//routes.use(authMiddleware);

exports. default = routes;