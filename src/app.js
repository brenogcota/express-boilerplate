import express from 'express';
import routes from './routes';
import helmet from 'helmet';

import './database/index';

class App {
    constructor() {
        this.server = express();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json());
        this.server.use(helmet());
    }

    routes() {
        this.server.use(routes);
    }
}

export default  new App().server;