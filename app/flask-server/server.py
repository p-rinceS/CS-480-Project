from doctest import debug

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS, cross_origin
from flask_restx import Api, Resource
import os
from postgres_server import db_connection, initialize_db
from postgres_queries import get_all_clients
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
@api.route('/api/test')
class ExampleResource(Resource):
  def get(self):
    connection = db_connection()
    if connection:
      try:
        get_all_clients(connection)
      finally:
        print("Closing connection")
        connection.close()
    return {"message":"test json"}

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