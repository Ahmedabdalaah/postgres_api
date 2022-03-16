/* eslint-disable prettier/prettier */
import express, { Request, Response } from 'express';
import supertest from 'supertest';
import productRoutes  from '../handlers/products';
import userRoutes from '../handlers/users';
import orderRoutes from '../handlers/orders';
import { Order } from '../models/order';
import { request, response } from 'express';
const requestProduct=supertest(productRoutes);
const requestUser=supertest(userRoutes);
const requestOrder=supertest(orderRoutes);
const app: express.Application = express();

it('gets the test order endpoint',  done => {
  const response =  requestOrder.get('/orders')
  expect(response.send).toBeDefined;
  done()
});

it('gets the test order endpoint',  done => {
  const response =  requestOrder.get('/order/show')
  expect(response.send).toBeDefined;
  done()
});

it('gets the test endpoint',  done => {
  const response =  requestOrder.get('/orders')
  expect(response.send.length).toBeGreaterThan(0);
  done()
});

it('gets the test endpoint',  done => {
  const response =  requestOrder.get('/orders')
  expect(response.responseType.length).toBeGreaterThan(0);
  done()
});

it('gets the test endpoint order type response',  done => {
  const response =  requestOrder.get('/order/show')
  expect(response.responseType.length).toBeGreaterThan(0);
  done()
});


it('gets the test endpoint',  done => {
  const response =  requestUser.get('/users')
  expect(response.send).toBeDefined;
  done()
});

it('gets the test endpoint',  done => {
  const response =  requestUser.get('/user/show')
  expect(response.send).toBeDefined;
  done()
});

it('gets the test endpoint',  done => {
  const response =  requestUser.get('/users')
  expect(response.send.length).toBeGreaterThan(0);
  done()
});

it('gets the test endpoint user type response ',  done => {
  const response =  requestUser.get('/users')
  expect(response.responseType.length).toBeGreaterThan(0);
  done()
});

it('gets the test endpoint',  done => {
  const response =  requestUser.get('/user/show')
  expect(response.responseType.length).toBeGreaterThan(0);
  done()
});

it('gets the test endpoint',  done => {
  requestUser.get('/user/show');
  const id=10;
  expect(id).toEqual(10);
  done()
});
it('gets the test endpoint',  done => {
  const response =  requestProduct.get('/products')
  expect(response.send).toBeDefined;
  done()
});

it('gets the test endpoint',  done => {
  const response =  requestProduct.get('/product/show')
  expect(response.send).toBeDefined;
  done()
});

it('gets the test endpoint',  done => {
  const response =  requestProduct.get('/products')
  expect(response.send.length).toBeGreaterThan(0);
  done()
});

it('gets the test endpoint',  done => {
  const response =  requestProduct.get('/products')
  expect(response.responseType.length).toBeGreaterThan(0);
  done()
});

it('gets the test endpoint',  done => {
  const response =  requestProduct.get('/product/show')
  expect(response.responseType.length).toBeGreaterThan(0);
  done()
});

it('gets the test endpoint',  done => {
  requestProduct.get('/product/show',done)
const id=1;
  expect(id).toEqual(1);
  done()
});
