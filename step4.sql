CREATE TABLE client (
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    home_road TEXT NOT NULL,
    home_number INTEGER NOT NULL,
    home_city TEXT NOT NULL,
    CONSTRAINT fk_client_address FOREIGN KEY (home_road, home_number, home_city) REFERENCES address(road, number, city) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (email)
);

CREATE TABLE credit_card (
    number TEXT NOT NULL,
    client_email TEXT NOT NULL,
    billing_road TEXT NOT NULL,
    billing_number INTEGER NOT NULL,
    billing_city TEXT NOT NULL,
    CONSTRAINT fk_card_client FOREIGN KEY (client_email) REFERENCES client(email) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_card_address FOREIGN KEY (billing_road, billing_number, billing_city) REFERENCES address(road, number, city) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (number)
);

CREATE TABLE driver (
    name TEXT NOT NULL,
    home_road TEXT NOT NULL,
    home_number INTEGER NOT NULL,
    home_city TEXT NOT NULL,
    CONSTRAINT fk_driver_address FOREIGN KEY (home_road, home_number, home_city) REFERENCES address(road, number, city) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (name)
);

CREATE TABLE review (
    review_id SERIAL,
    message TEXT NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    client_email TEXT NOT NULL,
    driver_name TEXT NOT NULL,
    CONSTRAINT fk_review_client FOREIGN KEY (client_email) REFERENCES client(email) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_review_driver FOREIGN KEY (driver_name) REFERENCES driver(name) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (review_id, client_email)
);

CREATE TABLE rent (
    rent_id SERIAL,
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    client_email TEXT NOT NULL,
    driver_name TEXT NOT NULL,
    CONSTRAINT fk_rent_client FOREIGN KEY (client_email) REFERENCES client(email) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_rent_driver FOREIGN KEY (driver_name) REFERENCES driver(name) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (rent_id)
);

CREATE TABLE model (
    model_id SERIAL,
    color TEXT NOT NULL,
    year INT NOT NULL,
    transmission TEXT NOT NULL,
    car_id INT NOT NULL,
    rent_id INT NOT NULL,
    CONSTRAINT fk_model_car FOREIGn KEY (car_id) REFERENCES car(car_id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_model_rent FOREIGN KEY (rent_id) REFERENCES rent(rent_id) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (model_id, car_id)
);

CREATE TABLE driver_model (
    driver_name TEXT NOT NULL,
    model_id INT NOT NULL,
    car_id INT NOT NULL,
    CONSTRAINT fk_join_driver FOREIGN KEY (driver_name) REFERENCES driver(name) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_join_model FOREIGN KEY (model_id, car_id) REFERENCES model(model_id, car_id) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (driver_name, model_id, car_id)
);

CREATE TABLE client_address (
    client_email TEXT NOT NULL,
    home_road TEXT NOT NULL,
    home_number INTEGER NOT NULL,
    home_city TEXT NOT NULL,
    CONSTRAINT fk_join_client FOREIGN KEY (client_email) REFERENCES client(email) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_join_address FOREIGN KEY (home_road, home_number, home_city) REFERENCES address(road, number, city) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (client_email, home_road, home_number, home_city)
);