/* Replace with your SQL commands */
CREATE TABLE orderT(order_id SERIAL PRIMARY KEY,
                                            order_status VARCHAR(200),
                                                         user_id bigint REFERENCES userP(id));