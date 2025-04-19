CREATE SCHEMA taxiSchema;

CREATE TABLE address (
    address_id SERIAL,
    road_number INTEGER NOT NULL,
    city VARCHAR NOT NULL,
    PRIMARY KEY (address_id)
);

CREATE TABLE credit_card (
    card_id SERIAL,
    number VARCHAR UNIQUE NOT NULL,
    client_id INT NOT NULL,
    CONSTRAINT fk_card_client FOREIGN KEY (client_id) REFERENCES client(client_id),
    PRIMARY KEY (card_id)
);

CREATE TABLE client (
    client_id SERIAL,
    name VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    card_id INT UNIQUE NOT NULL,
    address_id INT NOT NULL,
    PRIMARY KEY (client_id),
    CONSTRAINT fk_client_address FOREIGN KEY (address_id) REFERENCES address(address_id),
    CONSTRAINT fk_client_card FOREIGN KEY (card_id) REFERENCES credit_card(card_id)
);

CREATE TABLE driver (
    driver_id SERIAL,
    name VARCHAR NOT NULL,
    manager VARCHAR NOT NULL,
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
    PRIMARY KEY (rent_id)
);

-- N:M relationship between client and driver's rent
CREATE TABLE client_driver_rent (
    rent_id INT NOT NULL,
    client_id INT NOT NULL,
    driver_id INT NOT NULL,
    PRIMARY KEY (client_id, driver_id),
    FOREIGN KEY (client_id) REFERENCES client(client_id),
    FOREIGN KEY (driver_id) REFERENCES driver(driver_id),
    FOREIGN KEY (rent_id) REFERENCES rent(rent_id)
);

CREATE TABLE model (
    model_id SERIAL,
    color VARCHAR NOT NULL,
    year INT NOT NULL,
    transmission VARCHAR NOT NULL,
    car_id INT NOT NULL,
    rent_id INT NOT NULL,
    PRIMARY KEY (model_id, car_id),
    CONSTRAINT fk_model_rent FOREIGN KEY (rent_id) REFERENCES rent(rent_id)
);

CREATE TABLE car (
    car_id SERIAL,
    brand VARCHAR NOT NULL,
    model_id INT NOT NULL,
    driver_id INT NOT NULL,
    PRIMARY KEY (car_id)
);

-- N:M relationship between driver and car
CREATE TABLE driver_car (
    PRIMARY KEY (driver_id, car_id),
    driver_id INT NOT NULL,
    car_id INT NOT NULL,
    FOREIGN KEY (driver_id) REFERENCES driver(driver_id),
    FOREIGN KEY (car_id) REFERENCES car(car_id)
);

CREATE TABLE manager (
    ssn CHAR NOT NULL PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL
);

