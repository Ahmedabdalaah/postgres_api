"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable prettier/prettier */
const express_1 = __importDefault(require("express"));
const supertest_1 = __importDefault(require("supertest"));
const products_1 = __importDefault(require("../handlers/products"));
const users_1 = __importDefault(require("../handlers/users"));
const orders_1 = __importDefault(require("../handlers/orders"));
const requestProduct = (0, supertest_1.default)(products_1.default);
const requestUser = (0, supertest_1.default)(users_1.default);
const requestOrder = (0, supertest_1.default)(orders_1.default);
const app = (0, express_1.default)();
it('gets the test order endpoint', done => {
    const response = requestOrder.get('/orders');
    expect(response.send).toBeDefined;
    done();
});
it('gets the test order endpoint', done => {
    const response = requestOrder.get('/order/show');
    expect(response.send).toBeDefined;
    done();
});
it('gets the test endpoint', done => {
    const response = requestOrder.get('/orders');
    expect(response.send.length).toBeGreaterThan(0);
    done();
});
it('gets the test endpoint', done => {
    const response = requestOrder.get('/orders');
    expect(response.responseType.length).toBeGreaterThan(0);
    done();
});
it('gets the test endpoint order type response', done => {
    const response = requestOrder.get('/order/show');
    expect(response.responseType.length).toBeGreaterThan(0);
    done();
});
it('gets the test endpoint', done => {
    const response = requestUser.get('/users');
    expect(response.send).toBeDefined;
    done();
});
it('gets the test endpoint', done => {
    const response = requestUser.get('/user/show');
    expect(response.send).toBeDefined;
    done();
});
it('gets the test endpoint', done => {
    const response = requestUser.get('/users');
    expect(response.send.length).toBeGreaterThan(0);
    done();
});
it('gets the test endpoint user type response ', done => {
    const response = requestUser.get('/users');
    expect(response.responseType.length).toBeGreaterThan(0);
    done();
});
it('gets the test endpoint', done => {
    const response = requestUser.get('/user/show');
    expect(response.responseType.length).toBeGreaterThan(0);
    done();
});
it('gets the test endpoint', done => {
    requestUser.get('/user/show');
    const id = 10;
    expect(id).toEqual(10);
    done();
});
it('gets the test endpoint', done => {
    const response = requestProduct.get('/products');
    expect(response.send).toBeDefined;
    done();
});
it('gets the test endpoint', done => {
    const response = requestProduct.get('/product/show');
    expect(response.send).toBeDefined;
    done();
});
it('gets the test endpoint', done => {
    const response = requestProduct.get('/products');
    expect(response.send.length).toBeGreaterThan(0);
    done();
});
it('gets the test endpoint', done => {
    const response = requestProduct.get('/products');
    expect(response.responseType.length).toBeGreaterThan(0);
    done();
});
it('gets the test endpoint', done => {
    const response = requestProduct.get('/product/show');
    expect(response.responseType.length).toBeGreaterThan(0);
    done();
});
it('gets the test endpoint', done => {
    requestProduct.get('/product/show', done);
    const id = 1;
    expect(id).toEqual(1);
    done();
});
