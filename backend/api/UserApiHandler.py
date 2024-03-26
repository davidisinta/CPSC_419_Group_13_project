from flask_restful import Resource, request
from .productiondbconfig import establish_connection

class UserApiHandler(Resource):
    """
    Function to insert user information into the database.
    
    Expected parameters in the POST request JSON body:
        first_name: User's first name
        last_name: User's last name
        role: User's role
        email: User's email address
        password_hash: Hashed password
        
    Returns:
        JSON response indicating success or failure.
    """
    def post(self):
        # Parse request data
        data = request.get_json()
        first_name = data['first_name']
        last_name = data['last_name']
        role = data['role']
        email = data['email']
        password_hash = data['password_hash']
        
        try:
            with establish_connection() as connection:
                cursor = connection.cursor()
                query = """INSERT INTO user (first_name, last_name, role, email, password_hash)
                        VALUES (%s, %s, %s, %s, %s)"""
                cursor.execute(query, (first_name, last_name, role, email, password_hash))
                connection.commit()
                return {'message': 'User added successfully'}, 201
        except Exception as e:
            return {'message': str(e)}, 500