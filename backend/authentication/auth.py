from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import pydantic

app = Flask("authentication")

# Dummy database to store user information
users = []

@app.route('/register', methods=['POST', 'GET'])
def register():
    if request.method == 'GET':
        return {'message': 'Heyy Thereee!'}


    # Extract email and password from the request
    first_name = request.json.get('first_name')
    last_name = request.json.get('last_name')
    email_address = request.json.get('email_address')
    password = request.json.get('password')

    # Check if email or password is missing
    if not email_address or not password:
        return jsonify({'message': 'email or password missing'}), 400

    # Hash the password
    hashed_password = generate_password_hash(password)

    # Save email and hashed password in the database
    users.append({'username': email_address, 'password_hash': hashed_password,
                  'first_name': first_name, 'last_name': last_name})

    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/login', methods=['POST', 'GET'])
def login():
    # Extract email and password from the request
    email_address = request.json.get('email_address')
    password = request.json.get('password')

    # Check if email or password is missing
    if not email_address or not password:
        return jsonify({'message': 'email or password missing'}), 400

    # Find the user in the database
    user = next((u for u in users if u['username'] == email_address), None)
    if user and check_password_hash(user['password_hash'], password):
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'message': 'Invalid username or password'}), 401

if __name__ == '__main__':
    app.run(debug=True, port = 3344)
