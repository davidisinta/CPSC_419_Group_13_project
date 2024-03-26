from flask import Flask
from flask_restful import Api
from flask_cors import CORS #comment this on deployment
from backend.api.InventoryTableApiHandler import InventoryTableApiHandler
from backend.api.StockTonerApiHandler import StockTonerApiHandler
from backend.api.TonerTypesApiHandler import TonerTypesApiHandler

from backend.authentication.auth import auth_app

stc_app = Flask("STC Kilroy App")
CORS(stc_app) #comment this on deployment
api = Api(stc_app)


# Register Flask-RESTful resources
api.add_resource(InventoryTableApiHandler, '/')
api.add_resource(StockTonerApiHandler, '/update_stock')
api.add_resource(TonerTypesApiHandler, '/get_toner_types')


# Register Blueprints
stc_app.register_blueprint(auth_app)

if __name__ == '__main__':
    stc_app.run(debug=True, port=4444)
