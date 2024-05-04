from flask_restful import Resource, request
from flask import jsonify, Response
from .productiondbconfig import establish_connection

def jsonify_rows(data) -> Response:
    """ Returns a jsonified list of report rows from a list of tuples (database query result)."""
    out = []
    for tuple in data:
        formatted_tuple = {
            "p_name": tuple[0],
            "type": tuple[1],
            "p_id": tuple[2],
            "time": tuple[3],
            "desc": tuple[4],
            "r_id": tuple[5]
        }
        out.append(formatted_tuple)
    return jsonify(out)

class GetReportsApiEndpoint(Resource):
    """
        Function for getting unhandled reports.

        Parameters: 
            None
        
        Returns:
            Jsonified task list as formatted above.
    """
    def get(self):
        try:
            with establish_connection() as connection:
                cursor = connection.cursor()
                query = """
                        SELECT p.name, r.type, r.printer_id, r.time, r.desc, r.id
                        FROM reports r
                        LEFT JOIN printer on p.id = r.printer_id
                        WHERE r.handled = false
                        ORDER BY r.time
                        """
                cursor.execute(query)
                response = jsonify_rows(cursor.fetchall())
                response.status_code = 200
                return response
        except Exception as e:
            return {'message': str(e)}, 500
