import psycopg2

DB = "stcdb"
HOST = "ep-bold-morning-a5urtgao.us-east-2.aws.neon.tech"
PORT = "5432"

class Connection:
    def __init__(self, user, password):
        self._user = user
        self._password = password
        self._connection = psycopg2.connect(database=DB, host=HOST, 
                                            user=user, password=password, port=PORT)
        self._cursor = self._connection.cursor()
    
    def close(self):
        self._connection.close()

    def get_summary(self):
        """
        Returns a table of tuples of basic printer info for all printers
        in the stc database.

        Note: Incomplete, doesn't join for specific toner type names, haven't
        decided how I want to do that yet.
        """
        query = """SELECT p.id, 
                          status, 
                          paper, 
                          zone, 
                          string_agg(t.type, ', ') as toner_type, 
                          string_agg(wt.type, ', ') as waste_toner, 
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
                GROUP BY p.id, status, paper, zone, k_level, c_level, m_level, y_level, model, kyo_num
                ORDER BY zone
                """
        self._cursor.execute(query)
        return self._cursor.fetchall()
    
    def stock_toner(self, loc_id, toner_id, quantity):
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
        query = """INSERT INTO toner_inventory (loc_id, toner_id, quantity)
                VALUES (%s, %s, %s)
                ON CONFLICT (loc_id, toner_id)
                DO UPDATE SET quantity = %s"""
        self._cursor.execute(query, (loc_id, toner_id, quantity, quantity))
        return

    def get_toner_types(self, print_id):
        """
        Gets all of the toner types for a given printer id.

        Used to generate options for employees to select from
        when stocking toner on a given printer's page.

        Parameters:
            print_id: ID of the printer to get toner types for
        
        Returns:
            list of toner type tuples (id, type, color)
        """
        
        query = """SELECT id, type, color
                FROM toner_inventory ti
                LEFT JOIN toner t
                ON t.id = ti.toner_id
                LEFT JOIN printer p
                ON ti.loc_id = p.loc_id
                WHERE p.id = $1"""
        self._cursor.execute(query, (print_id))
        return self._cursor.fetchall()


if __name__ == '__main__':
    con = Connection("fisher.marks", "FgbxGdU60iXt")
    print(con.get_summary())

