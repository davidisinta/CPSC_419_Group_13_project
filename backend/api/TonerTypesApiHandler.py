from flask_restful import Resource, request
from .config import establish_connection

class TonerTypesApiHandler(Resource):
    def get(self):
        printer_id = request.get_json()['printer_id']
        with establish_connection() as connection:
            cursor = connection.cursor()
            query = """SELECT id, type, color
                FROM toner_inventory ti
                LEFT JOIN toner t
                ON t.id = ti.toner_id
                LEFT JOIN printer p
                ON ti.loc_id = p.loc_id
                WHERE p.id = $1"""
            cursor.execute(query, (printer_id))
            return cursor.fetchall()
            