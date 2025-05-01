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

def get_top_k_rent_clients(connection, k):
    try:
        cursor = connection.cursor()
        query = """
            SELECT name, email
            FROM taxischema.client
            ORDER BY (
                SELECT count(*)
                FROM taxischema.rent
                WHERE rent.client_email = client.email
            ) DESC, name ASC
            LIMIT %s;"""
        cursor.execute(query, (k,))
        results = cursor.fetchall()
        return results
    except psycopg2.Error as e:
        print(f"Error executing query: {e}")
        return None
    finally:
        cursor.close()

def get_city_clients(connection, city1, city2):
    try:
        cursor = connection.cursor()
        query = """
            SELECT name, email
            FROM taxischema.client
            WHERE client.email IN (
                SELECT client_email
                FROM taxischema.client_address
                WHERE client_address.home_city = %s
            ) AND client.email IN (
                SELECT client_email
                FROM taxischema.rent
                WHERE rent.driver_name IN (
                    SELECT name
                    FROM taxischema.driver
                    WHERE driver.home_city = %s
                )
            );"""
        cursor.execute(query, (city1, city2))
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

def select_all_cars_and_rents(connection):
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

def select_all_models_and_rents(connection):
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

def select_all_drivers_and_rents_rating(connection):
    try:
        cursor = connection.cursor()
        query = """
            SELECT *, (
                SELECT count(*)
                FROM taxischema.rent
                WHERE rent.driver_name = driver.name
            ) as rents, (
                SELECT ROUND(avg(rating), 1)
                FROM taxischema.review
                WHERE review.driver_name = driver.name
            ) as avg_rating
            FROM taxischema.driver;"""
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


def insert_client(connection, name, email, home_road, home_number, home_city):
    try:
        cursor = connection.cursor()
        query1 ='''
            INSERT INTO taxischema.address (road, number, city)
            SELECT %s, %s, %s
            WHERE NOT EXISTS (
                SELECT 1
                FROM taxischema.address
                WHERE road = %s AND number = %s AND city = %s
            )'''
        query2 = '''
            INSERT INTO taxischema.client (name, email, home_road, home_number, home_city)
            VALUES (%s, %s, %s, %s, %s);'''
        cursor.execute(query1, (home_road, home_number, home_city, home_road, home_number, home_city))
        cursor.execute(query2, (name, email, home_road, home_number, home_city))
        connection.commit()
        results = cursor.rowcount > 0
        return results
    except psycopg2.Error as e:
        print(f"Error executing query: {e}")
        return None
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

def insert_driver(connection, name, home_road, home_number, home_city):
    try:
        cursor = connection.cursor()
        query1 ='''
            INSERT INTO taxischema.address (road, number, city)
            SELECT %s, %s, %s
            WHERE NOT EXISTS (
                SELECT 1
                FROM taxischema.address
                WHERE road = %s AND number = %s AND city = %s
            )'''
        query2 = '''
            INSERT INTO taxischema.driver (name, home_road, home_number, home_city)
            VALUES (%s, %s, %s, %s);'''
        cursor.execute(query1, (home_road, home_number, home_city, home_road, home_number, home_city))
        cursor.execute(query2, (name, home_road, home_number, home_city))
        connection.commit()
        results = cursor.rowcount > 0
        return results
    except psycopg2.Error as e:
        print(f"Error executing query: {e}")
        return None
    finally:
        cursor.close()

def delete_driver(connection, name):
    try:
        cursor = connection.cursor()
        query = "DELETE FROM taxischema.driver WHERE name = %s;"
        cursor.execute(query, (name,))
        connection.commit()
        results = cursor.rowcount > 0
        return results
    except psycopg2.Error as e:
        print(f"Error executing query: {e}")
        return None
    finally:
        cursor.close()

def get_available_cars(connection, input_date):
    try:
        cursor = connection.cursor()

        query = """
            SELECT DISTINCT c.car_id, c.brand, m.model_id, m.color, m.year, m.transmission
            FROM taxischema.car c
            JOIN taxischema.model m ON c.car_id = m.car_id
            JOIN taxischema.driver_model dm ON m.model_id = dm.model_id AND c.car_id = dm.car_id
            WHERE dm.driver_name NOT IN (
                SELECT r.driver_name
                FROM taxischema.rent r
                WHERE DATE(r.date) = %s
            )
            AND c.car_id NOT IN (
                SELECT r.car_id
                FROM taxischema.rent r
                WHERE DATE(r.date) = %s
            );
        """

        cursor.execute(query, (input_date, input_date))
        results = cursor.fetchall()
        return results

    except psycopg2.Error as e:
        print(f"Error executing query: {e}")
        return None
    finally:
        cursor.close()

def get_past_rents(connection, email):
    try:
        cursor = connection.cursor()
        query = """
            SELECT r.car_id, c.brand, m.model_id, m.color, m.year, m.transmission, 
                   r.driver_name, r.date, r.rent_id
            FROM taxischema.rent r
            JOIN taxischema.client cl ON r.client_email = cl.email
            JOIN taxischema.model m ON r.model_id = m.model_id AND r.car_id = m.car_id
            JOIN taxischema.car c ON m.car_id = c.car_id
            WHERE cl.email = %s;
        """
        cursor.execute(query, (email,))
        results = cursor.fetchall()
        return results
    except psycopg2.Error as e:
        print(f"Error executing query: {e}")
        return None
    finally:
        cursor.close()


def book_rent(connection, client_email, car_id, model_id, date):
    try:
        cursor = connection.cursor()
        query = """
            WITH available_driver AS (
                SELECT DISTINCT dm.driver_name
                FROM taxischema.driver_model dm
                WHERE dm.model_id = %s
                AND dm.driver_name NOT IN (
                    SELECT r.driver_name
                    FROM taxischema.rent r
                    WHERE DATE(r.date) = %s
                )
                LIMIT 1
            )
            INSERT INTO taxischema.rent (client_email, car_id, model_id, driver_name, date)
            VALUES (%s, %s, %s, (SELECT driver_name FROM available_driver), %s);
        """
        cursor.execute(query, (model_id, date, client_email, car_id, model_id, date))
        connection.commit()
        print("Rent booked successfully")
        return {"message": "Rent booked successfully"}
    except psycopg2.Error as e:
        print(f"Error executing query: {e}")
        connection.rollback()
    finally:
        cursor.close()

def get_all_drivers(connection):
    try:
        cursor = connection.cursor()
        query = "SELECT * FROM taxischema.driver;"
        cursor.execute(query)
        results = cursor.fetchall()
        return results
    except psycopg2.Error as e:
        print(f"Error executing query: {e}")
        return None
    finally:
        cursor.close()

def get_drivers_that_have_rented(connection, client_email):
    try:
        cursor = connection.cursor()
        query = """
            SELECT DISTINCT r.driver_name
            FROM taxischema.rent r
            WHERE r.client_email = %s
        """
        cursor.execute(query, (client_email,))
        results = cursor.fetchall()
        return results
    except psycopg2.Error as e:
        print(f"Error executing query: {e}")
        return None
    finally:
        cursor.close()

def write_review(connection, client_email, driver_name, rating, message):
    try:
        cursor = connection.cursor()
        query = """
            INSERT INTO taxischema.review (client_email, driver_name, rating, message)
            VALUES (%s, %s, %s, %s);
        """
        cursor.execute(query, (client_email, driver_name, rating, message))
        connection.commit()
        print("Review written successfully")
    except psycopg2.Error as e:
        print(f"Error executing query: {e}")
        connection.rollback()
    finally:
        cursor.close()

def insert_manager(connection, name, email, ssn):
    try:
        cursor = connection.cursor()
        query = '''
            INSERT INTO taxischema.manager (ssn, name, email)
            VALUES (%s, %s, %s);'''
        cursor.execute(query, (ssn, name, email))
        connection.commit()
        results = cursor.rowcount > 0
        return results
    except psycopg2.Error as e:
        print(f"Error executing query: {e}")
        return None
    finally:
        cursor.close()

def get_all_models(conn):
    cursor = conn.cursor()
    cursor.execute("""
        SELECT model_id, car_id, color, year, transmission 
        FROM taxischema.model;
    """)
    models = cursor.fetchall()
    cursor.close()
    return [{"model_id": m[0], "car_id": m[1], "color": m[2], "year": m[3], "transmission": m[4]} for m in models]

def assign_driver_model(conn, driver_name, model_id, car_id):
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO taxischema.driver_model (driver_name, model_id, car_id)
        VALUES (%s, %s, %s)
        ON CONFLICT DO NOTHING;
    """, (driver_name, model_id, car_id))
    conn.commit()
    cursor.close()

def get_driver_address(conn, driver_name):
    cursor = conn.cursor()
    cursor.execute("""
        SELECT a.road, a.number, a.city
        FROM taxischema.driver d
        JOIN taxischema.address a
          ON d.home_road = a.road AND d.home_number = a.number AND d.home_city = a.city
        WHERE d.name = %s;
    """, (driver_name,))
    address = cursor.fetchone()
    cursor.close()
    return {"road": address[0], "number": address[1], "city": address[2]} if address else {}

def update_driver_address(conn, driver_name, road, number, city):
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO taxischema.address (road, number, city)
        VALUES (%s, %s, %s)
        ON CONFLICT DO NOTHING;
    """, (road, number, city))
    
    cursor.execute("""
        UPDATE taxischema.driver
        SET home_road = %s, home_number = %s, home_city = %s
        WHERE name = %s;
    """, (road, number, city, driver_name))
    
    conn.commit()
    cursor.close()
