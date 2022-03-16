"use strict";
/* eslint-disable prettier/prettier */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const dashboardService_1 = require("../services/dashboardService");
const products_1 = __importDefault(require("../handlers/products"));
const requestQ = (0, supertest_1.default)(products_1.default);
const request = (0, supertest_1.default)(dashboardService_1.Dashboard);
const store = new dashboardService_1.Dashboard();
describe('app connect to be undefined', () => {
    it('app connect to be undefined', () => {
        const product = request.connect;
        expect(product).toBeUndefined;
    });
});
describe('dash service', () => {
    it('should have an index method', () => {
        expect(store.productsInOrders).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.usersMakingOrders).toBeDefined();
    });
    it('gets the test endpoint', done => {
        const response = requestQ.get('/products_in_orders');
        expect(response.send).toBeDefined;
        done();
    });
    it('gets the test endpoint', done => {
        const response = requestQ.get('/users_with_orders');
        expect(response.send).toBeDefined;
        done();
    });
});
