import config
from config import config
from flask import Flask
from flask_restful import Api
from flask_cors import CORS #comment this on deployment
from api.InventoryTableApiEndpoint import InventoryTableApiEndpoint
from api.StockInventoryApiEndpoint import StockInventoryApiEndpoint
from api.TonerTypesApiEndpoint import TonerTypesApiEndpoint
from authentication.auth import auth_app


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
