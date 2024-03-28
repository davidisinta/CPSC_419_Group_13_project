from flask import Flask, request, jsonify, Blueprint, session
from werkzeug.security import generate_password_hash, check_password_hash
from backend.api.productiondbconfig import establish_connection
import psycopg2

auth_app = Blueprint('authentication',__name__)

@auth_app.route('/register', methods=['POST', 'GET'])
def register():
    if request.method == 'GET':
        return {'message': 'Heyy Thereee!'}

    # Extract email and password from the request
    first_name = request.json.get('first_name')
    last_name = request.json.get('last_name')
    email = request.json.get('email')
    password = request.json.get('password')
    role = 0 # Default role, 0:public, 1:employee, 2:admin


    # Check if firstName and lastName are given
    if not first_name:
        return jsonify({'message':'missing first name'}), 400

    if not last_name:
        return jsonify({'message':'missing last name'}), 400

    # Check if email or password is missing
    if not email or not password:
        return jsonify({'message': 'email or password missing'}), 400

    # Hash the password
    password_hash = generate_password_hash(password)

    # Save email and hashed password in the database
    try:
        with establish_connection() as connection:
            cursor = connection.cursor()

            # Check if email already exists
            cursor.execute("""SELECT 1 FROM users WHERE email = %s""", (email,))
            if cursor.fetchone():
                return jsonify({'message': 'Email already exists'}), 409
            
            # Insert email and corresponding information into database
            query = """INSERT INTO users (first_name, last_name, role, email, password_hash)
                    VALUES (%s, %s, %s, %s, %s) RETURNING id"""
            cursor.execute(query, (first_name, last_name, role, email, password_hash))
            user_id = cursor.fetchone()[0]
            connection.commit()

            session['user_id'] = user_id
            return {'message': 'User added successfully'}, 201
        
    except psycopg2.Error as e:
        print(e)
        return {'message': str(e)}, 500
    except Exception as e:
        print(e)
        return {'message': str(e)}, 500

@auth_app.route('/authenticate', methods=['POST', 'GET'])
def authenticate():

    email = request.json.get('email')
    password = request.json.get('password')
    if not email or not password:
        return jsonify({'message': 'email or password missing'}), 400

    # Find the user in the database
    try:
        with establish_connection() as connection:
            cursor = connection.cursor()
            # Check if email exists
            cursor.execute("""SELECT id, password_hash FROM users WHERE email = %s""", (email,))
            user = cursor.fetchone()
            print(user)
            if user:
                # user[1] contains the password_hash due to fetchone()
                if check_password_hash(user[1], password):
                    # Password is correct
                    session['user_id'] = user[0] # Log session
                    return jsonify({'message': 'Login successful'}), 200
                else:
                    # Password is incorrect
                    return jsonify({'message': 'Invalid email or password'}), 401
            else:
                # Email does not exist in database
                return jsonify({'message': 'Invalid email or password'}), 401
    except psycopg2.Error as e:
        print(e)
        return {'message': str(e)}, 500

    except Exception as e:
        return {'message': str(e)}, 500
    
@auth_app.route('/is_logged_in')
def is_logged_in():
    if 'user_id' in session:
        return jsonify({'loggedIn': True}), 201
    else:
        return jsonify({'loggedIn': False}), 201

@auth_app.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)  # Remove user_id from session
    return jsonify({'message': 'You have been logged out'}), 200