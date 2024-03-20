from flask_restful import Resource
from flask import jsonify, Response
from .config import establish_connection

def jsonify_printer_rows(data) -> Response:
    """ Returns a jsonified list of inventory table rows from a list of tuples (database query result)."""
    out = []
    for tuple in data:
        formatted_tuple = {
            "loc": tuple[0],
            "status": "Functional" if tuple[1] == 0 else "Not Working", 
            "paper": tuple[2] / 10, #stored as smallint instead of dec
            "zone": tuple[3],
            "toner_type": tuple[4],
            "waste_toner": tuple[5],
            "black_toner": tuple[6],
            "cyan_toner": tuple[7],
            "magenta_toner": tuple[8],
            "yellow_toner": tuple[9],
            "toner_percentage":{
                "black": tuple[10],
                "cyan": tuple[11],
                "magenta": tuple[12],
                "yellow": tuple[13]
            },
            "model": tuple[14],
            "kyocera_serial": tuple[15]
        }
        out.append(formatted_tuple)
    return jsonify(out)

class InventoryTableApiHandler(Resource):
    def get(self):
        try:
            with establish_connection() as connection:
                cursor = connection.cursor()
                query = """SELECT l.name, 
                                  status, 
                                  paper, 
                                  zone, 
                                  string_agg(DISTINCT t.type, ', ') as toner_type, 
                                  string_agg(DISTINCT wt.type, ', ') as waste_toner, 
                                  SUM(CASE WHEN t.color = 0 THEN ti.quantity ELSE 0 END) as black,
                                  SUM(CASE WHEN t.color = 1 THEN ti.quantity ELSE 0 END) as cyan,
                                  SUM(CASE WHEN t.color = 2 THEN ti.quantity ELSE 0 END) as magenta,
                                  SUM(CASE WHEN t.color = 3 THEN ti.quantity ELSE 0 END) as yellow, 
                                  k_level, 
                                  c_level, 
                                  m_level, 
                                  y_level, 
                                  model, 
                                  kyo_num
                        FROM location l 
                        LEFT JOIN printer p ON p.loc_id = l.id
                        LEFT JOIN toner_inventory ti ON l.id = ti.loc_id
                        LEFT JOIN toner t ON t.id = ti.toner_id
                        LEFT JOIN toner_inventory wi ON l.id = wi.loc_id
                        LEFT JOIN toner wt ON wt.id = wi.toner_id
                        WHERE t.id is NULL or t.color <> 4  AND wt.color = 4
                        GROUP BY l.name, status, paper, zone, k_level, c_level, m_level, y_level, model, kyo_num
                        ORDER BY zone, l.name
                        """
                cursor.execute(query)
                response = jsonify_printer_rows(cursor.fetchall())
                response.status_code = 200
                return response
        except Exception as e:
            return {'message': str(e)}, 500