from flask_restful import Resource, request
from .config import establish_connection

class StockTonerApiHandler(Resource):
    """
        Function for stocking a particular location with a toner type.

        Parameters: 
            loc_id: ID of the location being stocked
            toner_id: ID of the toner being added
            quantity: amount of toner being added
        
        Returns:
            None
    """
    def post(self):
        # Parse request data
        data = request.get_json()
        loc_id = data['loc_id']
        toner_id = data['toner_id']
        quantity = data['quantity']
        with establish_connection() as connection:
            cursor = connection.cursor()
            query = """INSERT INTO toner_inventory (loc_id, toner_id, quantity)
                    VALUES (%s, %s, %s)
                    ON CONFLICT (loc_id, toner_id)
                    DO UPDATE SET quantity = %s"""
            cursor.execute(query, (loc_id, toner_id, quantity, quantity))
            connection.commit()
        return {
            'message': 'Toner stocked successfully'
        }, 200
