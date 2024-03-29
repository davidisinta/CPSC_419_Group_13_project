import config
from backend.config import config
from flask import Flask
from flask_restful import Api
from flask_cors import CORS #comment this on deployment
from backend.authentication.auth import auth_app
from backend.api.InventoryTableApiHandler import InventoryTableApiHandler
from backend.api.StockTonerApiHandler import StockTonerApiHandler
from backend.api.TonerTypesApiHandler import TonerTypesApiHandler



def create_app(config_name):
    stc_app = Flask(__name__)
    stc_app.config.from_object(config[config_name])
    config[config_name].init_app(stc_app)


    CORS(stc_app)  # comment this on deployment
    api = Api(stc_app)

    # Register Flask-RESTful resources
    api.add_resource(InventoryTableApiEndpoint, '/')
    api.add_resource(StockInventoryApiEndpoint, '/update_inventory')
    api.add_resource(TonerTypesApiEndpoint, '/get_toner_types')

    # Register Blueprints
    stc_app.register_blueprint(auth_app)



    return stc_app
