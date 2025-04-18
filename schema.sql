CREATE TABLE manager (
  ssn CHARACTER(9) NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  PRIMARY KEY(ssn)
);

CREATE TABLE client (
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  PRIMARY KEY(email)
);

CREATE TABLE review (
  email TEXT NOT NULL,
  reviewid INTEGER NOT NULL,
  message TEXT NOT NULL,
  rating INTEGER CHECK (rating BETWEEN 0 AND 5),
  PRIMARY KEY (email, reviewid)
  FOREIGN KEY (email) REFERENCES client(email)
);

CREATE TABLE car (
  carid INTEGER NOT NULL
  brand TEXT NOT NULL
  PRIMARY KEY(carid)
);

CREATE TABLE model (
  carid INTEGER NOT NULL
  modelid INTEGER NOT NULL
  transmission TEXT CHECK (transmission IN ('manual', 'automatic'))
  year INTEGER NOT NULL
  color TEXT NOT NULL
  PRIMARY KEY(modelid)
  FOREIGN KEY (carid) REFERENCES car(carid)
);

CREATE TABLE driver (
  name TEXT NOT NULL
  PRIMARY KEY(name)
);

CREATE TABLE can_drive (
  name TEXT NOT NULL
  modelid INTEGER NOT NULL
  PRIMARY KEY()
);

CREATE TABLE rent (
  PRIMARY KEY()
);

CREATE TABLE credit_card (
  PRIMARY KEY()
);

CREATE TABLE address (
  PRIMARY KEY()
);

CREATE TABLE places (
  PRIMARY KEY()
);

CREATE TABLE has_address (
  PRIMARY KEY()
);

DROP TABLE manager