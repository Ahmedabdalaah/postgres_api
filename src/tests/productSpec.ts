/* eslint-disable prettier/prettier */
import supertest from 'supertest';
import { Product, productStore } from '../models/product';
import productRoutes from '../handlers/products';
const request = supertest(productStore);
const store = new productStore();


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
    expect(productRoutes.apply).toBeTruthy();
  });
  it('should have call', () => {
    expect(productRoutes.call).toBeTruthy();
  });
   it('should have bind', () => {
    expect(productRoutes.bind).toBeTruthy();
  });
  it('should be defined', () => {
    expect(productRoutes.name).toBeDefined();
  });
});
describe('create method should add an use', () => {
   const newProduct:Product=({
      id:360,
      productName: 'rice',
      price: 1,
      category: 'food' 
    });
      const result =  store.create({
       id:360,
      productName: 'rice',
      price: 50,
      category: 'food' 
    });
it('create method should add an use id', async () => {
    expect((await result).id).toEqual(newProduct.id);
  });
describe('create method should add product', () => {
   const newProduct:Product=({
         id:350,
      productName: 'banana',
      price: 121,
      category: 'fruits' 
    });
      const result =  store.create({
        id:350,
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
     const result =  await store.index() ;
      expect(result.length).toBeGreaterThan(0);
  });
 it('delete method should return a list of product', async () => {
     const result =  await store.delete(363) ;
      expect(result).toBeUndefined();
  });

});