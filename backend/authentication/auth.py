from flask import Flask, request, jsonify, Blueprint
from werkzeug.security import generate_password_hash, check_password_hash


auth_app = Blueprint('authentication',__name__)


# Dummy database to store user information
users = []

@auth_app.route('/register', methods=['POST', 'GET'])
def register():
    if request.method == 'GET':
        return {'message': 'Heyy Thereee!'}

    # Extract email and password from the request
    first_name = request.json.get('first_name')
    last_name = request.json.get('last_name')
    email_address = request.json.get('email_address')
    password = request.json.get('password')

    # Check if firstName and lastName are given
    if not first_name:
        return jsonify({'messaage':'missing first name'}), 400

    if not last_name:
        return jsonify({'messaage':'missing last name'}), 400


    # Check if email or password is missing
    if not email_address or not password:
        return jsonify({'message': 'email or password missing'}), 400

    # Hash the password
    hashed_password = generate_password_hash(password)

    # Save email and hashed password in the database
    users.append({'username': email_address, 'password_hash': hashed_password,
                  'first_name': first_name, 'last_name': last_name})

    return jsonify({'message': 'User registered successfully'}), 201

@auth_app.route('/login', methods=['POST', 'GET'])
def login():

    email_address = request.json.get('email_address')
    password = request.json.get('password')


    if not email_address or not password:
        return jsonify({'message': 'email or password missing'}), 400

    # Find the user in the database
    user = next((u for u in users if u['username'] == email_address), None)
    if user and check_password_hash(user['password_hash'], password):
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'message': 'Invalid username or password'}), 401



## create dummy sqlite database for testing and development
## create pydantic models to enforce some API rules
