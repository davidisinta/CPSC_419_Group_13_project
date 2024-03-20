from flask_restful import Resource, request
from .config import establish_connection

class StockTonerApiHandler(Resource):
    """
        Function for stocking a particular location with a toner type.

        Obviously the user isn't expected to know any IDs, so the real use
        case for this would be in a page that allows employees to edit information
        for a specific location they have clicked on. The toners at that location
        will be fetched for them, and they can select which toner they are stocking,
        and in the backend there is some metadata of that selection holding the ID
        of the toner to be stocked (from the get_toner_type function below). This 
        function would then be run if they choose to submit their selected options 
        to perform the update.

        Parameters: 
            loc_id: ID of the location being stocked
            toner_id: ID of the toner being added
            quantity: amount of toner being added
        
        Returns:
            None
    """
    def post():
        # Parse request data
        loc_id = request.get_json()['loc_id']
        toner_id = request.get_json()['toner_id']
        quantity = request.get_json()['quantity']
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
