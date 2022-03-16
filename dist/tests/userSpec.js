"use strict";
/* eslint-disable prettier/prettier */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const user_1 = require("../models/user");
const users_1 = __importDefault(require("../handlers/users"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const pepper = process.env.TOKEN_SECRET;
const saltRounds = process.env.SALT_ROUNDS;
const request = (0, supertest_1.default)(user_1.userStore);
const store = new user_1.userStore();
const secretToken = process.env.TOKEN_SECRET;
describe('app connect to be undefined', () => {
    it('app connect to be undefined', () => {
        const product = request.connect;
        expect(product).toBeUndefined;
    });
});
describe('user Model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(store.delete).toBeDefined();
    });
    it('should have apply', () => {
        expect(users_1.default.apply).toBeTruthy();
    });
    it('should have call', () => {
        expect(users_1.default.call).toBeTruthy();
    });
    it('should have bind', () => {
        expect(users_1.default.bind).toBeTruthy();
    });
    it('should be defined', () => {
        expect(users_1.default.name).toBeDefined();
    });
    describe('create method should add an use', () => {
        const newUser = ({
            id: 1001,
            firstName: 'ahmed',
            lastName: 'ali',
            password: 'ahmed123',
            phone: 1252
        });
        const hash = bcrypt_1.default.hashSync(newUser.password + pepper, parseInt(saltRounds));
        const result = store.create({
            id: 1001,
            firstName: 'ahmed',
            lastName: 'ali',
            password: hash,
            phone: 1252
        });
        it('create method should add an use id', async () => {
            expect((await result).id).toEqual(newUser.id);
        });
        describe('create method should add user', () => {
            const newUser = ({
                id: 1000,
                firstName: 'ahmed',
                lastName: 'ali',
                password: 'ahmed123',
                phone: 1252
            });
            const hash = bcrypt_1.default.hashSync(newUser.password + pepper, parseInt(saltRounds));
            const result = store.create({
                id: 1000,
                firstName: 'ahmed',
                lastName: 'ali',
                password: hash,
                phone: 1252
            });
            it('create method should add an user phone', async () => {
                expect((await result).phone).toEqual(newUser.phone);
            });
        });
        it('show method should return the correct user', async () => {
            const result = await store.show(1000);
            expect(result.id).toEqual(1000);
        });
        it('index method should return a list of user', async () => {
            const result = await store.index();
            expect(result.length).toBeGreaterThan(0);
        });
    });
    it('delete method should return a list of user', async () => {
        const result = await store.delete(204);
        expect(result).toBeUndefined();
    });
});
