CREATE TABLE manager (
    ssn CHAR(9) NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    PRIMARY KEY (ssn)
);

CREATE TABLE driver (
    name TEXT NOT NULL,
    PRIMARY KEY (name)
);

CREATE TABLE car (
    car_id SERIAL,
    brand TEXT NOT NULL,
    PRIMARY KEY (car_id)
);

CREATE TABLE rent (
    rent_id SERIAL,
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (rent_id)
);

CREATE TABLE client (
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    PRIMARY KEY (email)
);

CREATE TABLE credit_card (
    number TEXT NOT NULL,
    PRIMARY KEY (number)
);

CREATE TABLE address (
    road TEXT NOT NULL,
    number INTEGER NOT NULL,
    city TEXT NOT NULL,
    PRIMARY KEY (road, number, city)
);