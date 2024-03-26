from flask import session
from flask_restful import Resource, request
from werkzeug.security import check_password_hash
from .productiondbconfig import establish_connection
import psycopg2

class LoginApiHandler(Resource):
    """
    Function to authenticate user and store their ID in the session.
    
    Expected parameters in the POST request JSON body:
        email: User's email address
        password: User's password
        
    Returns:
        JSON response indicating success or failure.
    """
    def post(self):
        # Parse request data
        data = request.get_json()
        email = data['email']
        password = data['password']  # Assuming the password is sent in plaintext and will be hashed for verification
        try:
            with establish_connection() as connection:
                cursor = connection.cursor()
                # Query to fetch user's ID and password hash
                query = "SELECT id, password_hash FROM user WHERE email = %s"
                cursor.execute(query, (email,))
                user = cursor.fetchone()
                if user and check_password_hash(user[1], password):
                    # Password is correct, store authenticator token in session (change later, currently using id)
                    session['user_id'] = user[0]
                    return {'message': 'Login successful'}, 200
                else:
                    # Authentication failed
                    return {'message': 'Invalid email or password'}, 401
                
        except psycopg2.Error as e:
            print("Database error:", e)
            return {'message': str(e)}, 500
        except Exception as e:
            # Handle database connection errors or query execution errors
            return {'message': str(e)}, 500
        