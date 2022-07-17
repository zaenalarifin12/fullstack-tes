var express = require('express');
var router = express.Router();
const { User } = require("../models");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


router.post('/register', async function (req, res, next) {
    try {
        const { email, password, username } = await req.body;

        const schema = Joi.object({
            email: Joi.string().min(5).max(40).required().email(),
            password: Joi.string().min(8).max(40).trim().required(),
            username: Joi.string().max(100).required(),
        });
        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).json({
                message: "validation failed",
                error: {
                    message: error.details[0].message,
                },
            });
        }

        const user = await User.findOne({
            where: { email, email },
        });

        if (user) {
            return res.status(409).json({
                status: "register failed",
                message: "email already registered",
            });
        }

        const hashStrength = 10;
        const encrypPassword = await bcrypt.hash(password, hashStrength);

        const data = {
            email: email,
            password: encrypPassword,
            username: username,
        };

        const createUser = await User.create(data);

        const { JWT_SECRET } = process.env;

        const token = jwt.sign({ id: createUser.id }, JWT_SECRET);

        return res.json({
            status: "success",
            data: {
                user: {
                    username: createUser.username,
                    email: createUser.email,
                    token: token,
                },
            },
        });
    } catch (error) {
        console.log(error);
    }
});

router.post('/login', async function(req, res, next) {
    try {
        const { email, password } = req.body;

        const schema = Joi.object({
            email: Joi.string().email().max(40).required(),
            password: Joi.string().min(8).max(40),
        });
        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).json({
                message: "error validation",
                error: {
                    message: error.details[0].message,
                },
            });
        }

        const user = await User.findOne({
            where: { email: email },
        });

        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "user not found",
            });
        }

        const isValidPass = await bcrypt.compare(password, user.password);

        if (!isValidPass) {
            return res.status(401).json({
                status: "login failed",
                message: "your credential is not failed",
            });
        }

        const { JWT_SECRET } = process.env;

        const token = jwt.sign({ id: user.id }, JWT_SECRET);

        return res.json({
            status: "success",
            data: {
                user: {
                    username: user.username,
                    email: user.email,
                    token: token,
                },
            },
        });
    } catch (error) {
        console.log(error);
    }
});


module.exports = router;
