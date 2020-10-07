"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');

var _User = require('../app/models/User'); var _User2 = _interopRequireDefault(_User);
var _tools = require('../app/models/tools'); var _tools2 = _interopRequireDefault(_tools);

var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);

const models = [_User2.default, _tools2.default];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new (0, _sequelize.Sequelize)(_database2.default);

        models.map(model => model.init(this.connection));
    }
}

exports. default = new Database();