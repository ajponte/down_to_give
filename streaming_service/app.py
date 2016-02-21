from flask import Flask
from flask_restful import Resource, Api
from flask_restful import reqparse
from flask.ext.pymongo import PyMongo
from bson import BSON
from bson import json_util

import os
import sys
import json

app = Flask(__name__)
app.name = "nfl"
api = Api(app)
mongo = PyMongo(app)


class GetUser(Resource):
    def get(self):
    	online_users = mongo.db.users.find_one({'firstname': 'alan'})
    	print app.name
    	print online_users
    	return json.dumps(online_users, sort_keys=True, indent=4, default=json_util.default)
    	#return online_users

        #return {'hello': 'world'}

class GetRostersTeam3(Resource):
	def get(self):
		rosters = mongo.db.rosters.find_one({'teamId': "4"})
		print rosters
		return json.dumps(rosters, sort_keys=True, indent=4, default=json_util.default)

api.add_resource(GetUser, '/')
api.add_resource(GetRostersTeam3, '/rosters/')

if __name__ == '__main__':
    app.run(debug=True)