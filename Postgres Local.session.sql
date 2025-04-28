INSERT INTO taxischema.address (road, number, city)
VALUES
  ('Elm Street', 123, 'Springfield'),
  ('Elm Street', 124, 'Springfield'),
  ('Elm Street', 125, 'Springfield'),
  ('Maple Avenue', 456, 'Shelbyville'),
  ('Maple Avenue', 457, 'Shelbyville'),
  ('Pine Road', 789, 'Ogdenville'),
  ('Pine Road', 790, 'Ogdenville'),
  ('Oak Boulevard', 101, 'North Haverbrook'),
  ('Oak Boulevard', 102, 'North Haverbrook'),
  ('Cedar Lane', 202, 'Capital City'),
  ('Cedar Lane', 203, 'Capital City'),
  ('Birch Road', 301, 'Capital City');


INSERT INTO taxischema.client (name, email, home_road, home_number, home_city)
VALUES
  ('John Doe', 'john.doe@example.com', 'Elm Street', 123, 'Springfield'),
  ('John Smith', 'john.smith@example.com', 'Elm Street', 124, 'Springfield'),
  ('Jane Doe', 'jane.doe@example.com', 'Maple Avenue', 456, 'Shelbyville'),
  ('Robert Brown', 'robert.brown@example.com', 'Pine Road', 789, 'Ogdenville'),
  ('Robert Green', 'robert.green@example.com', 'Pine Road', 790, 'Ogdenville'),
  ('Alice White', 'alice.white@example.com', 'Oak Boulevard', 101, 'North Haverbrook'),
  ('Charlie Green', 'charlie.green@example.com', 'Cedar Lane', 202, 'Capital City'),
  ('Eva Blue', 'eva.blue@example.com', 'Cedar Lane', 203, 'Capital City'),
  ('George Clark', 'george.clark@example.com', 'Cedar Lane', 202, 'Capital City');


INSERT INTO taxischema.credit_card (number, client_email, billing_road, billing_number, billing_city)
VALUES
  ('4111111111111111', 'john.doe@example.com', 'Elm Street', 123, 'Springfield'),
  ('5111111111111111', 'john.smith@example.com', 'Elm Street', 124, 'Springfield'),
  ('4222222222222222', 'jane.doe@example.com', 'Maple Avenue', 456, 'Shelbyville'),
  ('4333333333333333', 'robert.brown@example.com', 'Pine Road', 789, 'Ogdenville'),
  ('5333333333333333', 'robert.green@example.com', 'Pine Road', 790, 'Ogdenville'),
  ('4444444444444444', 'alice.white@example.com', 'Oak Boulevard', 101, 'North Haverbrook'),
  ('4555555555555555', 'charlie.green@example.com', 'Cedar Lane', 202, 'Capital City'),
  ('5555555555555555', 'eva.blue@example.com', 'Cedar Lane', 203, 'Capital City');


INSERT INTO taxischema.driver (name, home_road, home_number, home_city)
VALUES
  ('Mike Johnson', 'Elm Street', 123, 'Springfield'),
  ('Mike Williams', 'Elm Street', 124, 'Springfield'),
  ('Linda Davis', 'Maple Avenue', 456, 'Shelbyville'),
  ('Steve Martinez', 'Pine Road', 789, 'Ogdenville'),
  ('Steve Brown', 'Pine Road', 790, 'Ogdenville'),
  ('Nancy Harris', 'Oak Boulevard', 101, 'North Haverbrook'),
  ('David Clark', 'Cedar Lane', 202, 'Capital City'),
  ('David Wilson', 'Cedar Lane', 203, 'Capital City');


INSERT INTO taxischema.review (message, rating, client_email, driver_name)
VALUES
  ('Great ride, smooth and fast!', 5, 'john.doe@example.com', 'Mike Johnson'),
  ('Great ride, smooth and fast!', 5, 'john.smith@example.com', 'Mike Williams'),
  ('Nice driver but the car could be cleaner.', 3, 'jane.doe@example.com', 'Linda Davis'),
  ('Excellent service, very friendly driver.', 5, 'robert.brown@example.com', 'Steve Martinez'),
  ('Nice car, but a little late.', 4, 'robert.green@example.com', 'Steve Brown'),
  ('The car was a bit uncomfortable.', 2, 'alice.white@example.com', 'Nancy Harris'),
  ('Fantastic experience, highly recommend!', 5, 'charlie.green@example.com', 'David Clark'),
  ('Friendly driver, but the car was dirty.', 3, 'eva.blue@example.com', 'David Wilson');


INSERT INTO taxischema.car (brand)
VALUES
  ('Toyota'),
  ('Toyota'),
  ('Honda'),
  ('Honda'),
  ('Ford'),
  ('Ford'),
  ('Chevrolet'),
  ('Chevrolet'),
  ('BMW'),
  ('Toyota');


INSERT INTO taxischema.model (model_id, color, year, transmission, car_id)
VALUES
  (1, 'Red', 2020, 'Automatic', 1),
  (2, 'Blue', 2020, 'Manual', 2),
  (3, 'Blue', 2021, 'Manual', 3),
  (4, 'Black', 2022, 'Automatic', 4),
  (5, 'Red', 2021, 'Automatic', 5),
  (6, 'White', 2020, 'Automatic', 6),
  (7, 'Silver', 2021, 'Manual', 7),
  (8, 'Silver', 2021, 'Manual', 8),
  (9, 'Silver', 2021, 'Automatic', 9),
  (1, 'Red', 2020, 'Automatic', 10);


INSERT INTO taxischema.rent (client_email, driver_name, model_id, car_id)
VALUES
  ('john.doe@example.com', 'Mike Johnson', 1, 1),
  ('john.smith@example.com', 'Mike Williams', 2, 2),
  ('jane.doe@example.com', 'Linda Davis', 3, 3),
  ('robert.brown@example.com', 'Steve Martinez', 4, 4),
  ('robert.green@example.com', 'Steve Brown', 5, 5),
  ('alice.white@example.com', 'Nancy Harris', 6, 6),
  ('charlie.green@example.com', 'David Clark', 7, 7),
  ('eva.blue@example.com', 'David Wilson', 8, 8);


INSERT INTO taxischema.manager (ssn, name, email)
VALUES
  ('123456789', 'William Scott', 'william.scott@example.com'),
  ('987654321', 'Sophia Taylor', 'sophia.taylor@example.com'),
  ('112233445', 'James Lee', 'james.lee@example.com'),
  ('556677889', 'Emma Wilson', 'emma.wilson@example.com'),
  ('998877665', 'Liam Harris', 'liam.harris@example.com');


INSERT INTO taxischema.driver_model (driver_name, model_id, car_id)
VALUES
  ('Mike Johnson', 1, 1),
  ('Mike Williams', 2, 2),
  ('Linda Davis', 3, 3),
  ('Steve Martinez', 4, 4),
  ('Steve Brown', 5, 5),
  ('Nancy Harris', 6, 6),
  ('David Clark', 7, 7),
  ('David Wilson', 8, 8);


INSERT INTO taxischema.client_address (client_email, home_road, home_number, home_city)
VALUES
  ('john.doe@example.com', 'Elm Street', 123, 'Springfield'),
  ('john.smith@example.com', 'Elm Street', 124, 'Springfield'),
  ('jane.doe@example.com', 'Maple Avenue', 456, 'Shelbyville'),
  ('robert.brown@example.com', 'Pine Road', 789, 'Ogdenville'),
  ('robert.green@example.com', 'Pine Road', 790, 'Ogdenville'),
  ('alice.white@example.com', 'Oak Boulevard', 101, 'North Haverbrook'),
  ('charlie.green@example.com', 'Cedar Lane', 202, 'Capital City'),
  ('eva.blue@example.com', 'Cedar Lane', 203, 'Capital City');

-- DROP SCHEMA taxischema CASCADE;
