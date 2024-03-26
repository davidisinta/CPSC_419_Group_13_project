from psycopg2 import connect

DB = "stcdb"
HOST = "ep-bold-morning-a5urtgao.us-east-2.aws.neon.tech"
PORT = "5432"
USER = "fisher.marks"
PASSWORD = "FgbxGdU60iXt"

def establish_connection():
    connection = connect(
        database=DB,
        host=HOST,
        port=PORT,
        user=USER,
        password=PASSWORD
    )
    return connection



