from flask_restful import Resource
from flask import jsonify, Response
from .productiondbconfig import establish_connection

def jsonify_printer_rows(data) -> Response:
    """ Returns a jsonified list of printer rows from a list of tuples (database query result)."""
    out = []
    for tuple in data:
        formatted_tuple = {
            "name": tuple[0],
            "addr": tuple[1] + ', New Haven, CT',
            "status": tuple[2]
        }
        out.append(formatted_tuple)
    return jsonify(out)

class PrinterLocationApiEndpoint(Resource):
    def get(self):
        try:
            with establish_connection() as connection:
                cursor = connection.cursor()
                query = """
                        SELECT l.name, l.addr, p.status
                        FROM printer p
                        LEFT JOIN location l on p.loc_id = l.id
                        """
                cursor.execute(query)
                response = jsonify_printer_rows(cursor.fetchall())
                response.status_code = 200
                return response
        except Exception as e:
            return {'message': str(e)}, 500