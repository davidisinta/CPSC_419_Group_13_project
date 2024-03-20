from flask import Flask
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS #comment this on deployment
from api.InventoryTableApiHandler import InventoryTableApiHandler
from api.StockTonerApiHandler import StockTonerApiHandler
from api.TonerTypesApiHandler import TonerTypesApiHandler

app = Flask(__name__, static_url_path='', static_folder='../frontend/build')
CORS(app) #comment this on deployment
api = Api(app)

api.add_resource(InventoryTableApiHandler, '/')
api.add_resource(StockTonerApiHandler, '/update_stock')
api.add_resource(TonerTypesApiHandler, '/get_toner_types')