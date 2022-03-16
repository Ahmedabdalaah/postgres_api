# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## Getting Started

You have all information of environment for database that using in this project in .env file
as following : POSTGRES_HOST=localhost,POSTGRES_DB=new_db_dev, POSTGRES_TEST_DB=my_new_db_test,POSTGRES_USER=postgres,POSTGRES_PASSWORD=post,ENV=dev,BCRYPT_PASSWORD=just_do_this_as_well,SALT_ROUNDS=10,TOKEN_SECRET=admin123


## Information to setup the database

HOST : localhost
Database : new_db_dev
TEST Database : my_new_db_test
User : postgres
PASSWORD: post
port : 5432
 
## Create User 
CREATE USER postgres WITH PASSWORD 'post'

## Createbase database
CREATE DATABASE new_db_dev;
CREATE DATABASE my_new_db_test;

## Grant all database privilages to user in boths databases
GRANT ALL PRIVILAGES ON DATABASE new_db_dev TO postgres;
GRANT ALL PRIVILAGES ON DATABASE my_new_db_test TO postgres;

## API Endpoints
#### Products
- An Index Route : '/products' [GET]  paramater - token : token
- A Show Route : '/product/show' [GET] paramaters - id : number 
- A Create Route: '/product' [POST] paramaters- id: number , productName:string , price: number , category:string , token : token
- A delete Route : '/product' [DELETE] paramaters - id : number , token : token

#### Users
- An Index Route :'/users' [GET] paramater - token : token
- A Show Route : '/user' [GET] paramaters - id : number , token : token
- A Create Route : '/user' [POST] paramaters - id:number,firstName:string,lastName:string,userPassword:string,phone:number
- A delete Route : '/user' [DELETE] paramaters - id : number , token : token

#### orders
- An Index Route :'/orders' [GET] paramater - token : token
- A Show Route : '/order/show' [GET] paramaters - order_id : number , token : token
- A Create Route : '/order' [POST] paramaters - order_id : number , user_id : number , order_status: string , token : token
- A delete Route : '/order' [DELETE] paramaters - order_id : number , token : token

#### order_product
- addProduct Route : '/orders/products' [POST] paramaters - order_id:number, product_id:number,quantity:number

#### dashboard
- productInOrders Route : '/products_in_orders' [GET] paramater - token : token
- userswithOrdersRoute  : '/users_with_orders' [GET] paramater - token : token

## Data scheme

#### Product

 id | productname | price | category
----+-------------+-------+----------
  1 | food        |   100 | food
  6 | sugar       |     5 | food
  7 | tomatos     |     7 | food
  8 | mango       |    10 | food
  2 | coca        |    20 | drink

#### UserP

 id | firstname | lastname |                         userpassword                         |   phone
----+-----------+----------+--------------------------------------------------------------+------------
  1 | Ahmed     | Ali      | ahmed1234                                                    |     223222
  2 | Ali       | Ahmed    | ali1456                                                      | 1022520202
  3 | mona      | Ahmed    | mona3214                                                     |  452552266
  4 | mona      | Ahmed    | mona3214                                                     |  452552266
  5 | noha      | kamal    | noha_528                                                     |   12552555
  6 | khalil    | fahmy    | $2b$10$GkynW/UCwq5J/cSCF5..NOa2Q0MDny0zLqPPVDaG62JjxRSpSEclu |      12522
  8 | khokha    |          | $2b$10$bxk93mzE132Q6xUQa6ouUug5PEqyV09wNKb09OV/Mjcfl0o6H7RNS |      12536
  9 | ali       |          | $2b$10$1ntkYldAP4MzfIIudNfZguMR.ttIOk1ILUPPgaYnqQXv/wCilqPSi |     125525
 10 | ahmed     |          | $2b$10$RhAkkZ6eTDbsFhSgeeiM3eUyt5UgJuq1h.AgfczH9HdO2C60xoGGu |   12255225
 12 | ahmed     | fathy    | $2b$10$R4mrFV9rAA2a8R39rQUOeeKoQ1WkxNxIYr8AoEOaaDM48qsJbNfm. |   22652255
 13 | ali       | magdy    | $2b$10$jsdbXzCwiCRIrTvBpfObK.z/vX3OXnNpSX0PvrPLmhDaIW2Ns.SuK |    2255225
 19 |           |          | $2b$10$CAhuz2pN3n989bYaL3wNheemXW.0ZD2cEzX9fCfBKfas7TXZLFtse |    1235225
 20 |           |          | $2b$10$N7mwB2ywdMUuTcWQ07PQGeNIlLrtUJ4qMWaBxtNSasIrP./hkstem |  125225525
 21 |           |          | $2b$10$gKRYbXAZ7IScGhlYm3yhheltExC69Ezb.r3vAK3G9pVw0DtJrpBGC |  123352255
 23 | magdy     | galal    | $2b$10$MmeZW43Zhq5RYMo9ShXPQemMyGrOzIE.5ar.rV1zS2OMM0Gqt9.oq |    1552255


#### OrderT

 order_id | order_status | user_id
----------+--------------+---------
        1 | active       |       2

#### order_product

id | quantity | order_id | product_id
---+----------+----------+------------
 1 |        3 |        1 |          2

## Data Shapes
### 1. products 
Table: product (id:serial [foreign key to order_product table], productName:varchar, price:integer, category:varchar)

### 2. users
Table: userP (id:serial [foreign key to orderT table], firstName:varchar,lastName:varchar, userPassword:varchar, phone:integer)

### 3. orderT 
Table: orderT (order_id:serial [foreign key to order_product table] , order_status:varchar, user_id:integer)

### 4. order_product 
Table: order_product (id:serial , quantity:integer,order_id:integer,product_id:integer)
