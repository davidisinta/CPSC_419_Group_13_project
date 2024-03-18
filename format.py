import json

def jsonify_printer_rows(data):
    out = []
    for tuple in data:
        formatted_tuple = {
            "id": tuple[0],
            "status": tuple[1],
            "paper": tuple[2],
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
    return json.dumps(out)
