"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Tools extends _sequelize.Model {
    static init(sequelize) {
        super.init({
            title: _sequelize2.default.STRING,
            link: _sequelize2.default.STRING,
            description: _sequelize2.default.STRING,
            tags: _sequelize2.default.ARRAY(_sequelize2.default.STRING)
        },
        {
            sequelize,
            timestamps: false
        }
        );


        return this;
    }

}

exports. default = Tools;