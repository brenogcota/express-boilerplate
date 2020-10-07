"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
require('dotenv').config();
var _routes = require('./routes'); var _routes2 = _interopRequireDefault(_routes);
var _helmet = require('helmet'); var _helmet2 = _interopRequireDefault(_helmet);

require('./database/index');

class App {
    constructor() {
        this.server = _express2.default.call(void 0, );

        this.middlewares();
        this.routes();
        this.static();
    }

    middlewares() {
        this.server.use(_express2.default.json());
        this.server.use(_helmet2.default.call(void 0, ));
    }

    routes() {
        this.server.use(_routes2.default);
    }

    static() {
        this.server.use('/static', _express2.default.static(__dirname + '/public'));
    }
}

exports. default =  new App().server;