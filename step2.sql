CREATE TABLE review (
    review_id SERIAL,
    message TEXT NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    client_email TEXT NOT NULL,
    CONSTRAINT fk_review_client FOREIGN KEY (client_email) REFERENCES taxischema.client(email) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (review_id, client_email)
);

CREATE TABLE model (
    model_id SERIAL,
    color TEXT NOT NULL,
    year INT NOT NULL,
    transmission TEXT NOT NULL,
    car_id INT NOT NULL,
    CONSTRAINT fk_model_car FOREIGn KEY (car_id) REFERENCES taxischema.car(car_id) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (model_id, car_id)
);