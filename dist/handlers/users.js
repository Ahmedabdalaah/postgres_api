"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyAuthToken_1 = __importDefault(require("../middlewae/verifyAuthToken"));
const secretToken = process.env.TOKEN_SECRET;
const store = new user_1.userStore();
const index = async (_req, res) => {
    try {
        const users = await store.index();
        res.json(users);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const show = async (req, res) => {
    try {
        const id = parseInt(req.body.id);
        const users = await store.show(id);
        res.json(users);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const create = async (req, res) => {
    const user = {
        id: parseInt(req.body.id),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        phone: parseInt(req.body.phone),
    };
    try {
        if (user.firstName === '') {
            res.status(400).send('first name is required');
        }
        else if (user.lastName === '') {
            res.status(400).send('last name is required');
        }
        else if (user.password === '') {
            res.status(400).send('password is required');
        }
        else if (!user.phone) {
            res.status(400).send('phone is required');
        }
        else {
            const newUser = await store.create(user);
            const token = jsonwebtoken_1.default.sign({ user: newUser }, secretToken);
            res.json(token);
        }
    }
    catch (err) {
        res.status(400);
        res.json('error' + err + user);
    }
};
const authenticate = async (req, res) => {
    const user = {
        firstName: req.body.firstName,
        lastName: '',
        password: req.body.password,
        phone: 0,
    };
    try {
        const u = await store.authenticate(user.firstName, user.password);
        const token = jsonwebtoken_1.default.sign({ user: u }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (error) {
        res.status(401);
        res.json({ error });
    }
};
const destroy = async (req, res) => {
    try {
        const id = parseInt(req.body.id);
        const deleted = await store.delete(id);
        res.json(deleted);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const userRoutes = (app) => {
    app.get('/users', verifyAuthToken_1.default, index);
    app.get('/user/show', verifyAuthToken_1.default, show);
    app.post('/user', create);
    app.post('/user/authenticate', authenticate);
    app.delete('/user', verifyAuthToken_1.default, destroy);
};
exports.default = userRoutes;
