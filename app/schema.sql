CREATE SCHEMA taxiSchema;

CREATE TABLE address (
    address_id SERIAL,
    road_number INTEGER NOT NULL,
    city VARCHAR(100) NOT NULL,
    PRIMARY KEY (address_id)
);

CREATE TABLE credit_card (
    card_id SERIAL,
    number VARCHAR(16) UNIQUE NOT NULL,
    address_id INT NOT NULL,
    client_id INT NOT NULL,
    PRIMARY KEY (card_id),
    CONSTRAINT fk_card_address FOREIGN KEY (address_id) REFERENCES address(address_id)
    CONStRAINT fk_card_client FOREIGN KEY (client_id) REFERENCES client(client_id)
);

CREATE TABLE client (
    client_id SERIAL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    card_id INT UNIQUE NOT NULL,
    address_id INT NOT NULL,
    PRIMARY KEY (client_id),
    CONSTRAINT fk_client_address FOREIGN KEY (address_id) REFERENCES address(address_id),
    CONSTRAINT fk_client_card FOREIGN KEY (card_id) REFERENCES credit_card(card_id)
);

CREATE TABLE driver (
    driver_id SERIAL,
    name VARCHAR(100) NOT NULL,
    manager VARCHAR (100) NOT NULL,
    address_id INT NOT NULL,
    PRIMARY KEY (driver_id),
    CONSTRAINT fk_driver_address FOREIGN KEY (address_id) REFERENCES address(address_id)
);

CREATE TABLE review (
    review_id SERIAL,
    message TEXT NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    client_id INT NOT NULL,
    driver_id INT NOT NULL,
    PRIMARY KEY (review_id, client_id),
    CONSTRAINT fk_review_client FOREIGN KEY (client_id) REFERENCES client(client_id),
    CONSTRAINT fk_review_driver FOREIGN KEY (driver_id) REFERENCES driver(driver_id)
);

CREATE TABLE rent (
    rent_id SERIAL,
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    driver_id INT NOT NULL,
    client_id INT NOT NULL,
    PRIMARY KEY (rent_id),
    CONSTRAINT fk_client_rent FOREIGN KEY (client_id) REFERENCES client(client_id),
    CONSTRAINT fk_driver_rent FOREIGN KEY (driver_id) REFERENCES driver(driver_id)
);

CREATE TABLE model (
    model_id SERIAL,
    color VARCHAR(50) NOT NULL,
    year INT NOT NULL,
    transmission VARCHAR(50) NOT NULL,
    car_id INT NOT NULL,
    rent_id INT NOT NULL,
    PRIMARY KEY (model_id, car_id),
    CONSTRAINT fk_model_rent FOREIGN KEY (rent_id) REFERENCES rent(rent_id)
);

CREATE TABLE car (
    car_id SERIAL,
    brand VARCHAR(50) NOT NULL,
    model_id INT NOT NULL,
    driver_id INT NOT NULL,
    PRIMARY KEY (car_id),
    CONSTRAINT fk_car_model FOREIGN KEY (model_id) REFERENCES model(model_id),
    CONSTRAINT fk_car_driver FOREIGN KEY (driver_id) REFERENCES driver(driver_id)
);

CREATE TABLE manager (
    ssn CHAR(9) NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    PRIMARY KEY (ssn)
);

