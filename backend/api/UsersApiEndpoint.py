from flask_restful import Resource, request
from flask import jsonify, Response
from .productiondbconfig import establish_connection

def jsonify_rows(data) -> Response:
    """ Returns a jsonified list of task rows from a list of tuples (database query result)."""
    out = []
    for tuple in data:
        formatted_tuple = {
            "id": tuple[0],
            "first": tuple[1],
            "last": tuple[2],
            "loc": tuple[3],
            "role": tuple[4],
            "email": tuple[5]
        }
        out.append(formatted_tuple)
    return jsonify(out)

class UsersApiEndpoint(Resource):
    """
        Function for getting for users.

        Parameters: 
            None
        
        Returns:
            Jsonified task list as formatted above.
    """
    def get(self):
        data = request.get_json()['body']
        try:
            with establish_connection() as connection:
                cursor = connection.cursor()
                query = """
                        SELECT * from users
                        """
                cursor.execute(query)
                response = jsonify_rows(cursor.fetchall())
                response.status_code = 200
                return response
        except Exception as e:
            return {'message': str(e)}, 500