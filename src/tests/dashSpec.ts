/* eslint-disable prettier/prettier */

import supertest from 'supertest';
import {  Dashboard } from '../services/dashboardService';
import orderRoutes from '../handlers/products';
const requestQ=supertest(orderRoutes);
const request = supertest(Dashboard);
const store = new Dashboard();

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

it('gets the test endpoint',  done => {
  const response =  requestQ.get('/products_in_orders')
  expect(response.send).toBeDefined;
  done()
});

it('gets the test endpoint',  done => {
  const response =  requestQ.get('/users_with_orders')
  expect(response.send).toBeDefined;
  done()
});
});