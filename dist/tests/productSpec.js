"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable prettier/prettier */
const supertest_1 = __importDefault(require("supertest"));
const product_1 = require("../models/product");
const products_1 = __importDefault(require("../handlers/products"));
const request = (0, supertest_1.default)(product_1.productStore);
const store = new product_1.productStore();
describe('app connect to be undefined', () => {
    it('app connect to be undefined', () => {
        const product = request.connect;
        expect(product).toBeUndefined;
    });
});
describe('product Model', () => {
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
        expect(products_1.default.apply).toBeTruthy();
    });
    it('should have call', () => {
        expect(products_1.default.call).toBeTruthy();
    });
    it('should have bind', () => {
        expect(products_1.default.bind).toBeTruthy();
    });
    it('should be defined', () => {
        expect(products_1.default.name).toBeDefined();
    });
});
describe('create method should add an use', () => {
    const newProduct = ({
        id: 360,
        productName: 'rice',
        price: 1,
        category: 'food'
    });
    const result = store.create({
        id: 360,
        productName: 'rice',
        price: 50,
        category: 'food'
    });
    it('create method should add an use id', async () => {
        expect((await result).id).toEqual(newProduct.id);
    });
    describe('create method should add product', () => {
        const newProduct = ({
            id: 350,
            productName: 'banana',
            price: 121,
            category: 'fruits'
        });
        const result = store.create({
            id: 350,
            productName: 'banana',
            price: 121,
            category: 'fruits'
        });
        it('create method should add an user product', async () => {
            expect((await result).price).toEqual(newProduct.price);
        });
    });
    it('show method should return the correct product', async () => {
        const result = await store.show(360);
        expect(result.id).toEqual(360);
    });
    it('index method should return a list of product', async () => {
        const result = await store.index();
        expect(result.length).toBeGreaterThan(0);
    });
    it('delete method should return a list of product', async () => {
        const result = await store.delete(363);
        expect(result).toBeUndefined();
    });
});
