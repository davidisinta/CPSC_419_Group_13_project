from flask_restful import Resource, request
from .productiondbconfig import establish_connection

class ClockInApiEndpoint(Resource):
    """
        Api endpoint for clocking into a shift.

        Parameters: 
            user_id: ID of user clocking in
            time: timestamp of clock-in
        
        Returns:
            None
    """
    def post(self):
        # Parse request data
        data = request.get_json()['body']
        try:
            with establish_connection() as connection:
                cursor = connection.cursor()
                query = """
                        INSERT INTO shifts (clock_in, clock_out, user_id)
                        VALUES (?, NULL, ?)
                        """
                param_list = (data["time"], data["user_id"])
                cursor.execute(query, param_list)
                connection.commit()
            return {
                'message': 'Clocked in successfully'
            }, 200
        except Exception as e:
            return {'message': str(e)}, 500
