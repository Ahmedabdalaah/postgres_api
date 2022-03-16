/* eslint-disable prettier/prettier */

import supertest from 'supertest';
import { User, userStore } from '../models/user';
import userRoutes from '../handlers/users';
import bcrypt from 'bcrypt';
const pepper = process.env.TOKEN_SECRET;
const saltRounds = process.env.SALT_ROUNDS as string;
const request = supertest(userStore);
const store = new userStore();
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
    expect(userRoutes.apply).toBeTruthy();
  });
  it('should have call', () => {
    expect(userRoutes.call).toBeTruthy();
  });
   it('should have bind', () => {
    expect(userRoutes.bind).toBeTruthy();
  });
  it('should be defined', () => {
    expect(userRoutes.name).toBeDefined();
  });

describe('create method should add an use', () => {
   const newUser:User=({
      id:1001,
      firstName: 'ahmed',
      lastName: 'ali',
      password: 'ahmed123' ,
      phone:1252
    });
        const hash = bcrypt.hashSync(newUser.password+ pepper, parseInt(saltRounds));
      const result =  store.create({
      id: 1001,
      firstName: 'ahmed',
      lastName: 'ali',
      password: hash,
      phone:1252
    });
it('create method should add an use id', async () => {
    expect((await result).id).toEqual(newUser.id);
  });
describe('create method should add user', () => {
   const newUser:User=({
      id:1000,
      firstName: 'ahmed',
      lastName: 'ali',
      password: 'ahmed123' ,
      phone:1252
    });
        const hash = bcrypt.hashSync(newUser.password+ pepper, parseInt(saltRounds));
      const result =  store.create({
      id: 1000,
      firstName: 'ahmed',
      lastName: 'ali',
      password: hash,
      phone:1252
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
     const result =  await store.index() ;
      expect(result.length).toBeGreaterThan(0);
  });
});
 it('delete method should return a list of user', async () => {
     const result =  await store.delete(204) ;
      expect(result).toBeUndefined();
  });
});