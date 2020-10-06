import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ToolsController from './app/controllers/ToolsController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/', (req, res) => {
   return res.json({ message: 'Welcome stranger!'});
});

routes.get('/tools', ToolsController.index);
routes.post('/tools', ToolsController.store);
routes.get('/tools/:id', ToolsController.show);
routes.put('/tools/:id', ToolsController.update);
routes.delete('/tools:id', ToolsController.destroy);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);


/*
 * ** Auth Middleware **
 * Remove this comment  to enable auth middleware
 *
 */
//routes.use(authMiddleware);

export default routes;