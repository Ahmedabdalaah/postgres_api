/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import express, { Request, Response } from 'express';
import { User, userStore } from '../models/user';
import jwt from 'jsonwebtoken';
import verifyAuthToken from '../middlewae/verifyAuthToken';
const secretToken = process.env.TOKEN_SECRET;
const store = new userStore();
const index = async (_req: Request, res: Response) => {
  try{
 const users = await store.index();
  res.json(users);
  }
  catch (err) {
    res.status(400);
    res.json( err );
  }
};

const show = async (req: Request, res: Response) => {
  try{
     const id = parseInt(req.body.id as string);
  const users = await store.show(id);
  res.json(users);
  }
 catch (err) {
    res.status(400);
    res.json( err );
  }
};

const create = async (req: Request, res: Response) => {
  const user: User = {
    id: parseInt(req.body.id as string),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    phone: parseInt(req.body.phone as string),
  };
  try {
    if (user.firstName === '') {
      res.status(400).send('first name is required');
    } else if (user.lastName === '') {
      res.status(400).send('last name is required');
    } else if (user.password === '') {
      res.status(400).send('password is required');
    } else if (!user.phone) {
      res.status(400).send('phone is required');
    } else {
      const newUser = await store.create(user);
      const token = jwt.sign({ user: newUser }, secretToken as string);
      res.json(token);
    }
  } catch (err) {
    res.status(400);
    res.json('error' + err + user);
  }
};

const authenticate = async (req: Request, res: Response) => {
  const user: User = {
    firstName: req.body.firstName,
    lastName: '',
    password: req.body.password,
    phone: 0,
  };
  try {
    const u = await store.authenticate(user.firstName, user.password);
    const token = jwt.sign({ user: u }, process.env.TOKEN_SECRET as string);
    res.json(token);
  } catch (error) {
    res.status(401);
    res.json({ error });
  }
};

const destroy = async (req: Request, res: Response) => {
  try{
const id = parseInt(req.body.id as string);
  const deleted = await store.delete(id);
  res.json(deleted);
  }
  catch (err) {
    res.status(400);
    res.json( err );
  }
};

const userRoutes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index);
  app.get('/user/show', verifyAuthToken, show);
  app.post('/user', create);
  app.post('/user/authenticate', authenticate);
  app.delete('/user', verifyAuthToken, destroy);
};

export default userRoutes;
