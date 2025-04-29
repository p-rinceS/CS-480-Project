CREATE SCHEMA IF NOT EXISTS taxischema;

CREATE TABLE IF NOT EXISTS taxischema.address (
      road TEXT NOT NULL,
      number INTEGER NOT NULL,
      city TEXT NOT NULL,
      PRIMARY KEY (road, number, city)
);

CREATE TABLE IF NOT EXISTS taxischema.client (
     name TEXT NOT NULL,
     email TEXT NOT NULL,
     home_road TEXT NOT NULL,
     home_number INTEGER NOT NULL,
     home_city TEXT NOT NULL,
     CONSTRAINT fk_client_address FOREIGN KEY (home_road, home_number, home_city) REFERENCES taxischema.address(road, number, city) ON UPDATE CASCADE ON DELETE CASCADE,
     PRIMARY KEY (email)
);

CREATE TABLE IF NOT EXISTS taxischema.credit_card (
      number TEXT NOT NULL,
      client_email TEXT NOT NULL,
      billing_road TEXT NOT NULL,
      billing_number INTEGER NOT NULL,
      billing_city TEXT NOT NULL,
      CONSTRAINT fk_card_client FOREIGN KEY (client_email) REFERENCES taxischema.client(email) ON UPDATE CASCADE ON DELETE CASCADE,
      CONSTRAINT fk_card_address FOREIGN KEY (billing_road, billing_number, billing_city) REFERENCES taxischema.address(road, number, city) ON UPDATE CASCADE ON DELETE CASCADE,
      PRIMARY KEY (number)
);

CREATE TABLE IF NOT EXISTS taxischema.driver (
         name TEXT NOT NULL,
         home_road TEXT NOT NULL,
         home_number INTEGER NOT NULL,
         home_city TEXT NOT NULL,
         CONSTRAINT fk_driver_address FOREIGN KEY (home_road, home_number, home_city) REFERENCES taxischema.address(road, number, city) ON UPDATE CASCADE ON DELETE CASCADE,
         PRIMARY KEY (name)
);

CREATE TABLE IF NOT EXISTS taxischema.review (
         review_id SERIAL,
         message TEXT NOT NULL,
         rating INT CHECK (rating BETWEEN 1 AND 5),
         client_email TEXT NOT NULL,
         driver_name TEXT NOT NULL,
         CONSTRAINT fk_review_client FOREIGN KEY (client_email) REFERENCES taxischema.client(email) ON UPDATE CASCADE ON DELETE CASCADE,
         CONSTRAINT fk_review_driver FOREIGN KEY (driver_name) REFERENCES taxischema.driver(name) ON UPDATE CASCADE ON DELETE CASCADE,
         PRIMARY KEY (review_id, client_email)
);

CREATE TABLE IF NOT EXISTS taxischema.car (
          car_id SERIAL,
          brand TEXT NOT NULL,
          PRIMARY KEY (car_id)
);

CREATE TABLE IF NOT EXISTS taxischema.model (
  model_id SERIAL,
  color TEXT NOT NULL,
  year INT NOT NULL,
  transmission TEXT NOT NULL,
  car_id INT NOT NULL,
  CONSTRAINT fk_model_car FOREIGN KEY (car_id) REFERENCES taxischema.car(car_id) ON UPDATE CASCADE ON DELETE CASCADE,
  PRIMARY KEY (model_id, car_id)
);

CREATE TABLE IF NOT EXISTS taxischema.rent (
  rent_id SERIAL,
  date TIMESTAMP NOT NULL,
  client_email TEXT NOT NULL,
  driver_name TEXT NOT NULL,
  model_id INT NOT NULL,
  car_id INT NOT NULL,
  CONSTRAINT fk_rent_client FOREIGN KEY (client_email) REFERENCES taxischema.client(email) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_rent_driver FOREIGN KEY (driver_name) REFERENCES taxischema.driver(name) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_rent_model FOREIGN KEY (model_id, car_id) REFERENCES taxischema.model(model_id, car_id) ON UPDATE CASCADE ON DELETE CASCADE,
  PRIMARY KEY (rent_id)
);

CREATE TABLE IF NOT EXISTS taxischema.manager (
          ssn CHAR(9) NOT NULL,
          name TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          PRIMARY KEY (ssn)
);

CREATE TABLE IF NOT EXISTS taxischema.driver_model (
           driver_name TEXT NOT NULL,
           model_id INT NOT NULL,
           car_id INT NOT NULL,
           CONSTRAINT fk_join_driver FOREIGN KEY (driver_name) REFERENCES taxischema.driver(name) ON UPDATE CASCADE ON DELETE CASCADE,
           CONSTRAINT fk_join_model FOREIGN KEY (model_id, car_id) REFERENCES taxischema.model(model_id, car_id) ON UPDATE CASCADE ON DELETE CASCADE,
           PRIMARY KEY (driver_name, model_id, car_id)
);

CREATE TABLE IF NOT EXISTS taxischema.client_address (
         client_email TEXT NOT NULL,
         home_road TEXT NOT NULL,
         home_number INTEGER NOT NULL,
         home_city TEXT NOT NULL,
         CONSTRAINT fk_join_client FOREIGN KEY (client_email) REFERENCES taxischema.client(email) ON UPDATE CASCADE ON DELETE CASCADE,
         CONSTRAINT fk_join_address FOREIGN KEY (home_road, home_number, home_city) REFERENCES taxischema.address(road, number, city) ON UPDATE CASCADE ON DELETE CASCADE,
         PRIMARY KEY (client_email, home_road, home_number, home_city)
);