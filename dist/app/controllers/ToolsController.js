"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _sequelize = require('sequelize');

var _tools = require('../models/tools'); var _tools2 = _interopRequireDefault(_tools);

class ToolsController {

    async index(req, res) {
        try {

            if(req.query.tag) {
                const tag = req.query.tag;

                const tools = await _tools2.default.findAll({
                    where: {
                      tags: {
                          [_sequelize.Op.contains]: [tag]
                      }
                    }
                });

                return res.status(200).json(tools);

            } else {
                const tools = await _tools2.default.findAll();
    
                return res.status(200).json(tools);

            }

        } catch(err) {
            return res.status(500).json({ message: "An error ocurred"});
        }
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            title: Yup.string().required(),
            link: Yup.string().required(),
            description: Yup.string().required().min(6),
            tags: Yup.array().required()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails'});
        }

        try {

            const ToolsExists = await _tools2.default.findOne({ where: { title: req.body.title }});
    
            if (ToolsExists) {
                return res.status(400).json({ error: 'Tools already exists.'});
            }
    
            const {id, description, title, link, tags } = await _tools2.default.create(req.body);
    

            return res.status(201).json({
                id,
                description,
                title,
                link,
                tags
            });

        } catch (err) {
            return res.status(500).json({ message: "An error ocurred"});
        }

    }

    async show(req, res) {
        try {

            const tool = await _tools2.default.findByPk(req.params.id);

            if(!tool) {
                return res.status(404).json({ message: "Tool not found!"});
            }

            return res.status(200).json(tool);

        } catch (err) {
            return res.status(500).json({ message: "An error ocurred"});
        }
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            description: Yup.string().min(6),
            title: Yup.string().required(),
            link: Yup.string().required(),
            tags: Yup.array().required()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails'});
        }

        try {

            const tool = await _tools2.default.findByPk(req.params.id);

            if(!tool) {
                return res.status(404).json({ message: "Tool not found!"});
            }

            const {id, title, description, link, tags } = await tool.update(req.body);

            return res.status(200).json({
                id,
                description,
                title,
                link,
                tags
            });

        } catch (err) {
            return res.status(500).json({ message: "An error ocurred"});
        }

    }

    async destroy(req, res) {

        try {

            const tool = await _tools2.default.findByPk(req.params.id);

            if(!tool) {
                return res.status(404).json({ message: "Tool not found!"});
            }

            await tool.destroy(req.body);

            return res.status(204).json({ message: "Tool removed!"});

        } catch (err) {
            return res.status(500).json({ message: "An error ocurred"});
        }
    }
}

exports. default = new ToolsController();