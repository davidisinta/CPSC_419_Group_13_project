from backend.config import config
from flask import Flask
from flask_restful import Api
from flask_cors import CORS #comment this on deployment
from flask_session import Session
from backend.api.InventoryTableApiHandler import InventoryTableApiHandler
from backend.api.StockTonerApiHandler import StockTonerApiHandler
from backend.api.TonerTypesApiHandler import TonerTypesApiHandler
from backend.api.UserApiHandler import UserApiHandler
from backend.api.LoginApiHandler import LoginApiHandler
from backend.authentication.auth import auth_app
from backend.generate_secret_key import load_secret_key


def create_app(config_name):
    stc_app = Flask(__name__)
    stc_app.config.from_object(config[config_name])
    config[config_name].init_app(stc_app)

    CORS(stc_app)  # comment this on deployment

    # Configure the Flask-Session
    stc_app.config["SESSION_PERMANENT"] = False
    stc_app.config["SESSION_TYPE"] = "filesystem"
    Session(stc_app)
    stc_app.secret_key = load_secret_key()

    api = Api(stc_app)

    # Register Flask-RESTful resources
    api.add_resource(InventoryTableApiHandler, '/')
    api.add_resource(StockTonerApiHandler, '/update_stock')
    api.add_resource(TonerTypesApiHandler, '/get_toner_types')
    api.add_resource(UserApiHandler, '/register_new_user')
    api.add_resource(LoginApiHandler, '/authenticate')

    # Register Blueprints
    stc_app.register_blueprint(auth_app)



    return stc_app
