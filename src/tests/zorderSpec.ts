/* eslint-disable prettier/prettier */
import supertest from 'supertest';
import { Order, orderStore } from '../models/order';
import orderRoutes from '../handlers/products';

const request = supertest(orderStore);
const store = new orderStore();

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
    expect(orderRoutes.apply).toBeTruthy();
  });
  it('should have call', () => {
    expect(orderRoutes.call).toBeTruthy();
  });
   it('should have bind', () => {
    expect(orderRoutes.bind).toBeTruthy();
  });
  it('should be defined', () => {
    expect(orderRoutes.name).toBeDefined();
  });
});
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
