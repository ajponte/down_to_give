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

# Set the collection name
app.name = "nfl"

api = Api(app)
mongo = PyMongo(app)

class GetRoster(Resource):
	""" 
	Returns the teams roster by their roster id number.
	"""
	def get(self, team_id):
		parser = reqparse.RequestParser()
		parser.add_argument('team_id')
		args = parser.parse_args()
		print str(args)
		rosters = mongo.db.rosters.find_one({'teamId': str(team_id)})
		return json.dumps(rosters, sort_keys=True, indent=4, default=json_util.default)

api.add_resource(GetRoster, '/rosters/<team_id>/')

if __name__ == '__main__':
    app.run(debug=True)