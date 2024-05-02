from psycopg2 import connect
from config import DB_PASSWORD

DB = "stcdb"
HOST = "ep-bold-morning-a5urtgao.us-east-2.aws.neon.tech"
PORT = "5432"
USER = "fisher.marks"

def establish_connection():
    connection = connect(
        database=DB,
        host=HOST,
        port=PORT,
        user=USER,
        password=DB_PASSWORD
    )
    return connection



