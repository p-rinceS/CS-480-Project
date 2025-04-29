
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flask_restx import Api, Resource
import os
import datetime
from postgres_server import db_connection, initialize_db
from postgres_queries import *

# from postgres_queries import some queries functions we made
app = Flask(__name__, static_folder='../client/dist', template_folder='../client/dist')
# app = Flask(__name__)
CORS(app)
api = Api(app, doc='/docs')


# serves react front end files from build directory
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react(path):
  if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
    return send_from_directory(app.static_folder, path)
  else:
    return send_from_directory(app.static_folder, 'index.html')

# example for /api/test route
@api.route('/api/test/get_clients')
class ExampleResource(Resource):
  def get(self):
    connection = db_connection()
    if connection:
      try:
        return jsonify(get_all_clients(connection))
      finally:
        print("Closing connection")
        connection.close()
    return {"message":"test json"}

@api.route('/api/test/add_address')
class ExampleResource(Resource):
    def post(self):
        connection = db_connection()
        if connection:
          try:
              data = request.get_json()
              road = data.get('road')
              number = data.get('number')
              city = data.get('city')
              add_address(connection, road, number, city)
          finally:
              print("Closing connection")
              connection.close()
          return {"message":"Address added successfully"}

@api.route('/api/test/add_client')
class ExampleResource(Resource):
  def post(self):
    connection = db_connection()
    if connection:
      try:
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        home_road = data.get('home_road')
        home_number = data.get('home_number')
        home_city = data.get('home_city')
        add_client(connection, name, email, home_road, home_number, home_city)
      finally:
        print("Closing connection")
        connection.close()
    return {"message":"Client added successfully"}

@api.route('/api/test/remove_client')
class ExampleResource(Resource):
  def post(self):
    connection = db_connection()
    if connection:
      try:
        data = request.get_json()
        email = data.get('email')
        remove_client(connection, email)
      finally:
        print("Closing connection")
        connection.close()
    return {"message":"Client removed successfully"}

@api.route('/api/check_user')
class ExampleResource(Resource):
  def post(self):
    connection = db_connection()
    if connection:
      try:
        data = request.get_json()
        role = data.get('role')
        identifier = data.get('identifier')

        result = check_user_exists(connection, role, identifier)
        print("Result:", result)
        return jsonify(result)
      except Exception as e:
        print("Error while connecting to PostgreSQL:", e)
      finally:
        print("Closing connection")
        connection.close()
    return {"message": "test json"}

@api.route('/api/add_client_credit_card')
class ExampleResource(Resource):
  def post(self):
    connection = db_connection()
    if connection:
      try:
        data = request.get_json()
        client_email = data.get('client_email')
        card_number = data.get('card_number')
        billing_road = data.get('billing_road')
        billing_number = data.get('billing_number')
        billing_city = data.get('billing_city')

        result = add_client_credit_card(connection, client_email, card_number, billing_road, billing_number, billing_city)
      finally:
        print("Closing connection")
        connection.close()
    return {"message":"Client credit card added successfully"}

@api.route('/api/get_client_credit_cards')
class ExampleResource(Resource):
  def post(self):
    connection = db_connection()
    if connection:
      try:
        data = request.get_json()
        client_email = data.get('client_email')
        result = get_client_credit_cards(connection, client_email)
        return jsonify(result)
      finally:
        print("Closing connection")
        connection.close()
    return {"message":" Could not get client credit cards"}

@api.route('/api/delete_client_credit_card')
class ExampleResource(Resource):
  def post(self):
    connection = db_connection()
    if connection:
      try:
        data = request.get_json()
        client_email = data.get('client_email')
        card_number = data.get('card_number')
        billing_road = data.get('billing_road')
        billing_number = data.get('billing_number')
        billing_city = data.get('billing_city')
        result = remove_client_credit_card(connection, client_email, card_number, billing_road, billing_number, billing_city)
        return jsonify(result)
      finally:
        print("Closing connection")
        connection.close()
    return {"message":"Client credit card deleted successfully"}

# ----------------------- MANAGER API ROUTES -----------------------
@api.route('/api/models')
class ModelResource(Resource):
  def get(self):
    connection = db_connection()
    try:
      result = select_all_models_with_rents(connection)
      return (result, 200)
    except:
      return ('Error getting data', 400)
    
  def post(self):
    connection = db_connection()
    try:
      data = request.get_json()
      color = data.get('color')
      year = data.get('year')
      transmission = data.get('transmission')
      car_id = data.get('carId')
      result = insert_model(connection, color, year, transmission, car_id)
      return (result, 200)
    except:
      return ('Error getting data', 400)
    
  def delete(self):
    data = request.get_json()
    model_id = data.get('modelId')
    connection = db_connection()
    try:
      result = delete_model(connection, model_id)
      return (result, 200)
    except:
      return ('Error getting data', 400)
    
@api.route('/api/cars')
class CarResource(Resource):
  def get(self):
    connection = db_connection()
    try:
      result = select_all_cars_with_rents(connection)
      return (result, 200)
    except:
      return ('Error getting data', 400)
    
  def post(self):
    connection = db_connection()
    try:
      data = request.get_json()
      brand = data.get('brand')
      result = insert_car(connection, brand)
      return (result, 200)
    except:
      return ('Error getting data', 400)
  
  def delete(self):
    data = request.get_json()
    car_id = data.get('carId')
    connection = db_connection()
    try:
      result = delete_car(connection, car_id)
      return (result, 200)
    except:
      return ('Error getting data', 400)
    
@api.route('/api/rents')
class RentResource(Resource):
  def get(self):
    connection = db_connection()
    try:
      result = select_all_rents(connection)

      # Convert datetimes to isoformat so they can be serialized
      processed_result = []
      for rent in result:
        processed_tuple = tuple(
          item.isoformat() if isinstance(item, datetime.datetime) else item
          for item in rent
        )
        processed_result.append(processed_tuple)
      return (processed_result, 200)
    except:
      return ('Error getting data', 400)
      

if __name__ == "__main__":
  initialize_db()
  app.run(debug=True)