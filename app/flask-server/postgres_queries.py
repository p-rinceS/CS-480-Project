import psycopg2


### QUERIES ###

def get_all_clients(connection):
    try:
        cursor = connection.cursor()
        query = "SELECT * FROM taxischema.client;"
        cursor.execute(query)
        results = cursor.fetchall()
        return results
    except psycopg2.Error as e:
        print(f"Error executing query: {e}")
        return None
    finally:
        cursor.close()

def check_user_exists(connection, role, identifier):
    try:
        cursor = connection.cursor()
        query = ""
        if role == 'client':
            query = "SELECT * FROM taxischema.client WHERE email = %s;"
        elif role == 'driver':
            query = "SELECT * FROM taxischema.driver WHERE name = %s;"
        elif role == 'manager':
            query = "SELECT * FROM taxischema.manager WHERE ssn = %s;"
        cursor.execute(query, (identifier,))
        result = cursor.fetchone()
        if result:
            columns = [desc[0] for desc in cursor.description]
            result = dict(zip(columns, result))
            return {"exists": True, "client": result}
        else:
            return False
    except psycopg2.Error as e:
        print(f"Error executing query: {e}")
        return False
    finally:
        cursor.close()

def get_client_credit_cards(connection, client_email):
    try:
        cursor = connection.cursor()
        query = """
        SELECT * FROM taxischema.credit_card
        WHERE client_email = %s;
        """
        cursor.execute(query, (client_email,))
        result = cursor.fetchall()
        if result:
            columns = [desc[0] for desc in cursor.description]
            result = [dict(zip(columns, row)) for row in result]
            return {"credit_card": result}
        else:
            return False
    except psycopg2.Error as e:
        print(f"Error executing query: {e}")
        return False
    finally:
        cursor.close()

def select_all_cars_with_rents(connection):
    try:
        cursor = connection.cursor()
        query = """
            SELECT *, (
                SELECT count(*)
                FROM taxischema.rent
                WHERE rent.car_id = car.car_id
            ) as rents
            FROM taxischema.car;"""
        cursor.execute(query)
        results = cursor.fetchall()
        return results
    except psycopg2.Error as e:
        print(f"Error executing query: {e}")
        return None
    finally:
        cursor.close()

def select_all_models_with_rents(connection):
    try:
        cursor = connection.cursor()
        query = """
            SELECT *, (
                SELECT count(*)
                FROM taxischema.rent
                WHERE rent.model_id = model.model_id
            ) as rents
            FROM taxischema.model;"""
        cursor.execute(query)
        results = cursor.fetchall()
        return results
    except psycopg2.Error as e:
        print(f"Error executing query: {e}")
        return None
    finally:
        cursor.close()

def select_all_rents(connection):
    try:
        cursor = connection.cursor()
        query = "SELECT * FROM taxischema.rent;"
        cursor.execute(query)
        results = cursor.fetchall()
        return results
    except psycopg2.Error as e:
        print(f"Error executing query: {e}")
        return None
    finally:
        cursor.close()

### MUTATIONS ###

def add_address(connection, road, number, city):
    try:
        cursor = connection.cursor()
        '''
         road TEXT NOT NULL,
         number INTEGER NOT NULL,
         city TEXT NOT NULL,
         PRIMARY KEY (road, number, city)
        '''
        query = "INSERT INTO taxischema.address (road, number, city) VALUES (%s, %s, %s);"
        cursor.execute(query, (road, number, city))
        connection.commit()
        print("Address added successfully")
    except psycopg2.Error as e:
        print(f"Error executing query: {e}")
        connection.rollback()
    finally:
        cursor.close()


def add_client(connection, name, email, home_road, home_number, home_city):
    try:
        cursor = connection.cursor()
        '''
         name TEXT NOT NULL,
         email TEXT NOT NULL,
         home_road TEXT NOT NULL,
         home_number INTEGER NOT NULL,
         home_city TEXT NOT NULL,
         CONSTRAINT fk_client_address FOREIGN KEY (home_road, home_number, home_city) REFERENCES taxischema.address(road, number, city) ON UPDATE CASCADE ON DELETE CASCADE,
         PRIMARY KEY (email)
        '''
        query = "INSERT INTO taxischema.client (name, email, home_road, home_number, home_city) VALUES (%s, %s, %s, %s, %s);"
        cursor.execute(query, (name, email, home_road, home_number, home_city))
        connection.commit()
        print("Client added successfully")
    except psycopg2.Error as e:
        print(f"Error executing query: {e}")
        connection.rollback()
    finally:
        cursor.close()

def remove_client(connection, email):
    try:
        cursor = connection.cursor()
        query = "DELETE FROM taxischema.client WHERE email = %s;"
        cursor.execute(query, (email,))
        connection.commit()
        print("Client removed successfully")
    except psycopg2.Error as e:
        print(f"Error executing query: {e}")
        connection.rollback()
    finally:
        cursor.close()

def add_client_credit_card(connection, email, card_number, billing_road, billing_number, billing_city):
    try:
        cursor = connection.cursor()
        query = """
        WITH inserted_address AS (
            INSERT INTO taxischema.address (road, number, city)
            VALUES (%s, %s, %s)
            ON CONFLICT DO NOTHING
        )
        INSERT INTO taxischema.credit_card (client_email, number, billing_road, billing_number, billing_city)
        VALUES (%s, %s, %s, %s, %s);
        """
        cursor.execute(query, (billing_road, billing_number, billing_city, email, card_number, billing_road, billing_number, billing_city))
        connection.commit()
        print("Client credit card added successfully")
        return {"message": "Client credit card added successfully"}
    except psycopg2.Error as e:
        print(f"Error executing query: {e}")
        connection.rollback()
    finally:
        cursor.close()

def remove_client_credit_card(connection, email, card_number, billing_road, billing_number, billing_city):
    try:
        cursor = connection.cursor()
        # Step 1: Remove the credit card
        delete_card_query = """
        DELETE FROM taxischema.credit_card 
        WHERE client_email = %s AND number = %s;
        """
        cursor.execute(delete_card_query, (email, card_number))
        delete_address_query = """
                WITH used_addresses AS (
                    SELECT billing_road AS road, billing_number AS number, billing_city AS city
                    FROM taxischema.credit_card
                    UNION ALL
                    SELECT home_road AS road, home_number AS number, home_city AS city
                    FROM taxischema.client
                )
                DELETE FROM taxischema.address
                WHERE road = %s AND number = %s AND city = %s
                AND NOT EXISTS (
                    SELECT 1 FROM used_addresses
                    WHERE road = %s AND number = %s AND city = %s
                );
                """
        cursor.execute(delete_address_query, (
            billing_road, billing_number, billing_city,
            billing_road, billing_number, billing_city
        ))
        connection.commit()
        print("Client credit card removed successfully")
    except psycopg2.Error as e:
        print(f"Error executing query: {e}")
        connection.rollback()
    finally:
        cursor.close()

def insert_car(connection, brand):
    try:
        cursor = connection.cursor()
        query = 'INSERT INTO taxischema.car (brand) VALUES (%s);'
        cursor.execute(query, (brand,))
        connection.commit()
        results = cursor.rowcount > 0
        return results
    except psycopg2.Error as e:
        print(f"Error executing query: {e}")
        return None
    finally:
        cursor.close()

def delete_car(connection, car_id):
    try:
        cursor = connection.cursor()
        query = "DELETE FROM taxischema.car WHERE car_id = %s;"
        cursor.execute(query, (car_id,))
        connection.commit()
        results = cursor.rowcount > 0
        return results
    except psycopg2.Error as e:
        print(f"Error executing query: {e}")
        return None
    finally:
        cursor.close()

def insert_model(connection, color, year, transmission, car_id):
    try:
        cursor = connection.cursor()
        query ='''
            INSERT INTO taxischema.model (color, year, transmission, car_id)
            VALUES (%s, %s, %s, %s);'''
        cursor.execute(query, (color, year, transmission, car_id))
        connection.commit()
        results = cursor.rowcount > 0
        return results
    except psycopg2.Error as e:
        print(f"Error executing query: {e}")
        return None
    finally:
        cursor.close()

def delete_model(connection, model_id):
    try:
        cursor = connection.cursor()
        query = "DELETE FROM taxischema.model WHERE model_id = %s;"
        cursor.execute(query, (model_id,))
        connection.commit()
        results = cursor.rowcount > 0
        return results
    except psycopg2.Error as e:
        print(f"Error executing query: {e}")
        return None
    finally:
        cursor.close()