/* eslint-disable prettier/prettier */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const verifyAuthToken = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authorizationHeader = req.headers.authorization as string
    const token = authorizationHeader.split(' ')[1]  ;
    jwt.verify(token, process.env.TOKEN_SECRET as string );
    return next();
  } catch (error) {
    res.status(401);
    res.json('Access denied, invalid token');
  }
};
export default verifyAuthToken;
