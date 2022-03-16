/* eslint-disable prettier/prettier */
import express, { Request, Response } from 'express';
import { Dashboard } from '../services/dashboardService';
import verifyAuthToken from '../middlewae/verifyAuthToken';
const dashboardRoutes = (app: express.Application) => {
  app.get('/products_in_orders', verifyAuthToken, productsInOrders);
  app.get('/users_with_orders', verifyAuthToken, usersinOrders);
};
const dashboard = new Dashboard();
const usersinOrders = async (_req: Request, res: Response) => {
  try{
 const users = await dashboard.usersMakingOrders();
  res.json(users);
  }
  catch (err) {
    res.status(400);
    res.json(err);
  }
};
const productsInOrders = async (_req: Request, res: Response) => {
  try{
  const products = await dashboard.productsInOrders();
  res.json(products);
  }
 catch (err) {
    res.status(400);
    res.json(err);
  }
};
export default dashboardRoutes;
