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
            return True
        else:
            return False
    except psycopg2.Error as e:
        print(f"Error executing query: {e}")
        return False
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