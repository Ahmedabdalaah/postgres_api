/* Replace with your SQL commands */
CREATE TABLE order_product (id SERIAL PRIMARY KEY,
                                              quantity integer, order_id bigint REFERENCES orderT(order_id),
                                                                                           product_id bigint REFERENCES product(id));