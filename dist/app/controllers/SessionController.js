"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _auth = require('../../config/auth'); var _auth2 = _interopRequireDefault(_auth);

class SessionController {
    async store(req, res) {
        const { email, password } = req.body;

        const user = await _User2.default.findOne({ where: { email }});

        if(!user) {
            return res.status(401).json({error: 'User not found'});
        }

        if(!(await user.checkPassoword(password))) {
            return res.status(401).json({ error: 'Password does not match'});
        }

        const { id, name } = user;

        return res.json({
            user: {
                id,
                name,
                email,
            },
            token: _jsonwebtoken2.default.sign({ id }, _auth2.default.secret, {
                expiresIn: _auth2.default.expiresIn,
            }),
        })
    }
}

exports. default = new SessionController();