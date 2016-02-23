from flask import Flask
from flask_restful import Resource, Api
from flask_restful import reqparse
from flask.ext.pymongo import PyMongo
from bson import BSON
from bson import json_util

import os
import sys
import json

"""
Logic to return the NFL data sets.  All the classes and methods
here are under the invariant that we are only interested about
game #2.
"""

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
        rosters = mongo.db.rosters.find_one({'teamId': str(team_id)})

        return json.dumps(rosters, sort_keys=True, indent=4, default=json_util.default)

class GetQ1Game(Resource):
    """
    Returns all the data for quarter 1 for the game by
    the game's id number.
    """
    def get(self, game_id):
        parser = reqparse.RequestParser()
        parser.add_argument('game_id')
        q1_data = mongo.db.quarter1.find_one({'gameId': int(game_id)})

        return json.dumps(q1_data, sort_keys=True, indent=4, default=json_util.default)

class GetQ2Game(Resource):
    """
    Returns all the data for quarter 2 for the game by the
    game's id number.
    """
    def get(self, game_id):
        parser = reqparse.RequestParser()
        parser.add_argument('game_id')
        q2_data = mongo.db.quarter2.find_one({'gameId': int(game_id)})

        return json.dumps(q2_data, sort_keys=True, indent=4, default=json_util.default)

class GetQ3Game(Resource):
    """
    Returns all the data for quarter 3 for the game by the
    game's id number.
    """
    def get(self, game_id):
        parser = reqparse.RequestParser()
        parser.add_argument('game_id')
        q3_data = mongo.db.quarter3.find_one({'gameId': int(game_id)})

        return json.dumps(q3_data, sort_keys=True, indent=4, default=json_util.default)

class GetQ4Game(Resource):
    """
    Returns all the data for quarter 4 for the game by the
    game's id number.
    """
    def get(self, game_id):
        parser = reqparse.RequestParser()
        parser.add_argument('game_id')
        q4_data = mongo.db.quarter4.find_one({'gameId': int(game_id)})

        return json.dumps(q4_data, sort_keys=True, indent=4, default=json_util.default)

api.add_resource(GetRoster, '/rosters/<team_id>/')
api.add_resource(GetQ1Game, '/game/<game_id>/q1/')
api.add_resource(GetQ2Game, '/game/<game_id>/q2/')
api.add_resource(GetQ3Game, '/game/<game_id>/q3/')
api.add_resource(GetQ4Game, '/game/<game_id>/q4/')

if __name__ == '__main__':
    app.run(debug=True)