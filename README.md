# CS-480-Project

Taxi-Rental Management App

Junyoung Jeong
Prince Sonani
Dane Nguyen

# Setting up postgres

1. Create a pgsql database locally.

2. Make the credentials the same as below.

### Credentials

- host = 127.0.0.1
- port = 5432
- username = postgres
- password = password
- database name = postgres

# How to run app

1. Start the pgsql server
2. Follow instructions for client and server below:

### Client

1. Navigate to app/client
2. Run `npm ci`
3. Run `npm run build`

### Server

1. Navigate to app/flask-server
2. Run `pip3 install -r requirements.txt`
3. Run `python3 server.py`
4. The application should now be running on `127.0.0.1:5000`
