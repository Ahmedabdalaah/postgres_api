/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import productRoutes from './handlers/products';
import userRoutes from './handlers/users';
import orderRoutes from './handlers/orders';
import dashboardRoutes from './handlers/dashboardRoute';
const app: express.Application = express();
import client from './database';
const address = 'localhost:3000';
const corsOptions = {
  origin: 'http//someotherdomain.com',
  optionSuceesStatus: 200,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});
productRoutes(app);
userRoutes(app);
orderRoutes(app);
dashboardRoutes(app);
app.listen(3000, function () {
  client
    .connect()
    .then(() => console.log(('connection successfully with database :  ' + process.env.POSTGRES_DB) as string))
    .catch((e) => console.log(e));
  console.log(`starting app on: ${address}`);
});
