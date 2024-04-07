import config
from backend.config import config
from flask import Flask
from flask_restful import Api
from flask_cors import CORS #comment this on deployment
from backend.authentication.auth import auth_app
from backend.authentication import cas_auth
from backend.api.InventoryTableApiEndpoint import InventoryTableApiEndpoint
from backend.api.StockInventoryApiEndpoint import StockInventoryApiEndpoint
from backend.api.TonerTypesApiEndpoint import TonerTypesApiEndpoint
from backend.api.PrinterLocationApiEndpoint import PrinterLocationApiEndpoint




def create_app(config_name='default'):
    stc_app = Flask(__name__)
    stc_app.config.from_object(config[config_name])
    config[config_name].init_app(stc_app)


    CORS(stc_app)  # comment this on deployment
    api = Api(stc_app)

    # Register Flask-RESTful resources
    api.add_resource(InventoryTableApiEndpoint, '/')
    api.add_resource(StockInventoryApiEndpoint, '/update_inventory')
    api.add_resource(TonerTypesApiEndpoint, '/get_toner_types')
    api.add_resource(PrinterLocationApiEndpoint, '/printers')
    
    # Register Blueprints
    stc_app.register_blueprint(auth_app)
    stc_app.register_blueprint(cas_auth, url_prefix='/cas')


    return stc_app
