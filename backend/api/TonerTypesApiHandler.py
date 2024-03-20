from flask_restful import Resource, request
from .config import establish_connection
from flask import jsonify, Response

def jsonify_toner_types(data) -> Response:
    """ Returns a jsonified list of inventory table rows from a list of tuples (database query result)."""
    out = []
    for tuple in data:
        formatted_tuple = {
            "id": tuple[0],
            "type": tuple[1]
        }
        out.append(formatted_tuple)
    return jsonify(out)

class TonerTypesApiHandler(Resource):
    def get(self):
        with establish_connection() as connection:
            cursor = connection.cursor()
            query = """SELECT id,
                            type || ' - ' || 
                            CASE color
                                WHEN 0 THEN 'Black'
                                WHEN 1 THEN 'Cyan'
                                WHEN 2 THEN 'Magenta'
                                WHEN 3 THEN 'Yellow'
                                WHEN 4 THEN 'Waste'
                            END AS type_and_color
                        FROM toner;"""
            cursor.execute(query)
            return jsonify_toner_types(cursor.fetchall())
            