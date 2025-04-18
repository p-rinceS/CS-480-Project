

CREATE SCHEMA taxiSchema;

CREATE TABLE addresses (
                           address_id SERIAL PRIMARY KEY,
                           road_number VARCHAR(10) NOT NULL,
                           city VARCHAR(100) NOT NULL
);

CREATE TABLE credit_cards (
                              card_id SERIAL PRIMARY KEY,
                              credit_card_number VARCHAR(16) UNIQUE NOT NULL,
                              billing_address_id INT NOT NULL,
                              CONSTRAINT fk_billing_address FOREIGN KEY (billing_address_id) REFERENCES addresses(address_id)
);

CREATE TABLE clients (
     client_id SERIAL PRIMARY KEY,
     name VARCHAR(100) NOT NULL,
     email VARCHAR(100) UNIQUE NOT NULL,
     card_id INT UNIQUE NOT NULL,
     address_id INT NOT NULL,
     CONSTRAINT fk_address FOREIGN KEY (address_id) REFERENCES addresses(address_id),
     CONSTRAINT fk_credit_card FOREIGN KEY (card_id) REFERENCES credit_cards(card_id)
);

CREATE TABLE drivers (
    driver_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    manager VARCHAR (100) NOT NULL,
    address_id INT NOT NULL,
    CONSTRAINT fk_address_driver FOREIGN KEY (address_id) REFERENCES addresses(address_id)
);

CREATE TABLE reviews (
     review_id SERIAL PRIMARY KEY,
     message TEXT NOT NULL,
     rating INT CHECK (rating >= 1 AND rating <= 5),
     client_id INT NOT NULL,
     driver_id INT NOT NULL,
     CONSTRAINT fk_client FOREIGN KEY (client_id) REFERENCES clients(client_id),
     CONSTRAINT fk_driver FOREIGN KEY (driver_id) REFERENCES drivers(driver_id)
);

CREATE TABLE car_models (
    model_id SERIAL PRIMARY KEY,
    color VARCHAR(50) NOT NULL,
    year INT NOT NULL,
    transmission VARCHAR(50) NOT NULL
);

CREATE TABLE car
(
    car_id   SERIAL PRIMARY KEY,
    brand    VARCHAR(50) NOT NULL,
    model_id INT         NOT NULL,
    driver_id INT         NOT NULL,
    CONSTRAINT fk_model FOREIGN KEY (model_id) REFERENCES car_models (model_id),
    CONSTRAINT fk_driver FOREIGN KEY (driver_id) REFERENCES drivers (driver_id)
);

CREATE TABLE rent (
    rent_id SERIAL PRIMARY KEY,
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    driver_id INT NOT NULL,
    client_id INT NOT NULL,
    CONSTRAINT fk_client_rent FOREIGN KEY (client_id) REFERENCES clients(client_id),
    CONSTRAINT fk_driver_rent FOREIGN KEY (driver_id) REFERENCES drivers(driver_id)
);

