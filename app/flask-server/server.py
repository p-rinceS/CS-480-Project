from doctest import debug

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS, cross_origin
from flask_restx import Api, Resource
import os

from unicodedata import digit

from postgres_server import db_connection, initialize_db
from postgres_queries import get_all_clients, add_client, add_address, remove_client, check_user_exists

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

        exists = check_user_exists(connection, role, identifier)

        return jsonify({"exists": exists})

      except Exception as e:
        print("Error while connecting to PostgreSQL", e)
      finally:
        print("Closing connection")
        connection.close()
    return {"message": "test json"}
"""
---- other example route for backend
@api.route('/api/auth')
class AuthResource(Resource):
  def get(self):
  def post(self):
  def delete(self):
"""

if __name__ == "__main__":
  initialize_db()
  app.run(debug=True)