from flask import Flask
from flask_cors import cross_origin
from connection import Connection
from format import jsonify_printer_rows

app = Flask(__name__)

@app.route('/summary', methods=['GET'])
@cross_origin()
def summary():
    try:
        con = Connection("fisher.marks", "FgbxGdU60iXt")
        return jsonify_printer_rows(con.get_summary())
    except Exception as e:
        return str(e)

if __name__ == '__main__':
    app.run(debug=True)
