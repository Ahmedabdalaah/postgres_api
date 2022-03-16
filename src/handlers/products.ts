/* eslint-disable prettier/prettier */
import express, { Request, Response } from 'express';
import { Product, productStore } from '../models/product';
import verifyAuthToken from '../middlewae/verifyAuthToken';
const store = new productStore();
const index = async (_req: Request, res: Response) => {
  try{
const products = await store.index();
  res.json(products);
  }
  catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try{
 const id = parseInt(req.body.id as string);
  const products = await store.show(id);
  res.json(products);
  }
 catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      id: parseInt(req.body.id as string),
      productName: req.body.productName,
      price: parseInt(req.body.price as string),
      category: req.body.category,
    };
    if (product.productName === '') {
      res.status(400).send('product name is required');
    } else if (product.price <= 0) {
      res.status(400).send('invalid price');
    } else if (!product.price) {
      res.status(400).send('price is required');
    } else {
      const newProduct = await store.create(product);
      res.json(newProduct);
    }
  } catch (err) {
    res.status(400);
    res.json(err);
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
    res.json(err);
  }
};

const productRoutes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/product/show', show);
  app.post('/product', verifyAuthToken, create);
  app.delete('/product', verifyAuthToken, destroy);
};

export default productRoutes;
