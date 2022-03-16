"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable prettier/prettier */
const supertest_1 = __importDefault(require("supertest"));
const order_1 = require("../models/order");
const products_1 = __importDefault(require("../handlers/products"));
const request = (0, supertest_1.default)(order_1.orderStore);
const store = new order_1.orderStore();
describe('app connect to be undefined', () => {
    it('app connect to be undefined', () => {
        const order = request.connect;
        expect(order).toBeUndefined;
    });
});
describe('order Model', () => {
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
/*
describe('create method should add an order', () => {
   const newOrder:Order=({
      order_id:350,
      order_status: 'active',
     user_id:1001
    });
      const result =  store.create(newOrder);
it('create method should add an order id', async () => {
      expect((await result).order_id).toEqual(350);
  });

 it('show method should return the correct order', async () => {
    const result = await store.show(350);
    expect(result.order_id).toEqual(350);
  });

  it('index method should return a list of order', async () => {
     const result =  await store.index() ;
      expect(result.length).toBeGreaterThan(0);
  });

  it('delete method should return a list of order', async () => {
     const result =  await store.delete(444) ;
      expect(result).toBeUndefined();
  });
  it('add product method should add product the  order', async () => {
      expect(store.addProduct).toBeDefined;
  });
});
*/
