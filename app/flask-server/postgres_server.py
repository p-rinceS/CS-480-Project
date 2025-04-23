import psycopg2
from psycopg2 import Error

def initialize_db():
    try:
        connection = psycopg2.connect(user="postgres",
                                      password="password",
                                      host="127.0.0.1",
                                      port="5432",
                                      database="postgres")
        cursor = connection.cursor()

        # Initialize db with our schema.sql
        with open('../schema.sql', 'r') as f:
            sql = f.read()
            cursor.execute(sql)
            connection.commit()
            print("Database initialized with schema.sql")
    except (Exception, Error) as error:
        print("Error while connecting to PostgreSQL", error)
    finally:
        if (connection):
            cursor.close()
            connection.close()
            print("PostgreSQL connection is closed")


def db_connection():
    try:
    # Connect to PostgreSQL
        connection = psycopg2.connect(user="postgres",
                                      password="password",
                                      host="127.0.0.1",
                                      port="5432",
                                      database="postgres")


        # Create a cursor to execute SQL queries
        cursor = connection.cursor()


        # Print PostgresQL details
        print("PostgreSQL server information")
        print(connection.get_dsn_parameters(), "\n")

        # Execute SQL query to test
        cursor.execute("SELECT version();")


        # Fetch result
        record = cursor.fetchone()
        print("You are connected to - ", record, "\n")
        return connection
    except (Exception, Error) as error:
        print("Error while connecting to PostgreSQL", error)


def close_connection(connection):
    if connection:
        connection.close()
