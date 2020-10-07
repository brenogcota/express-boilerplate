import express from 'express';
require('dotenv').config();
import routes from './routes';
import helmet from 'helmet';

import './database/index';

class App {
    constructor() {
        this.server = express();

        this.middlewares();
        this.routes();
        this.static();
    }

    middlewares() {
        this.server.use(express.json());
        this.server.use(helmet());
    }

    routes() {
        this.server.use(routes);
    }

    static() {
        this.server.use('/static', express.static(__dirname + '/public'));
    }
}

export default  new App().server;