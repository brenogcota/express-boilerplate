import * as Yup from 'yup';
import { Op } from 'sequelize';

import Tools from '../models/tools';

class ToolsController {

    async index(req, res) {
        try {

            if(req.query.tag) {
                const tag = req.query.tag;

                const tools = await Tools.findAll({
                    where: {
                      tags: {
                          [Op.contains]: [tag]
                      }
                    }
                });

                return res.json(tools);

            } else {
                const tools = await Tools.findAll();
    
                return res.json(tools);

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

            const ToolsExists = await Tools.findOne({ where: { title: req.body.title }});
    
            if (ToolsExists) {
                return res.status(400).json({ error: 'Tools already exists.'});
            }
    
            const {id, description, title, link, tags } = await Tools.create(req.body);
    

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

            const tool = await Tools.findByPk(req.params.id);

            if(!tool) {
                return res.status(404).json({ message: "Tool not found!"});
            }

            return res.status(201).json(tool);

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

            const tool = await Tools.findByPk(req.params.id);

            if(!tool) {
                return res.status(404).json({ message: "Tool not found!"});
            }

            const {id, title, description, link, tags } = await tool.update(req.body);

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

    async destroy(req, res) {

        try {

            const tool = await Tools.findByPk(req.params.id);

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

export default new ToolsController();