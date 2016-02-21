from flask import Flask
from flask_restful import Resource, Api
from flask_restful import reqparse

import json

app = Flask(__name__)
api = Api(app)

class LoginUser(Resource):
	def post(self):
		return json.dumps("You logged in!")

class Users(Resource):
	def post(self):
		return json.dumps("Made a new User!")

class UserProfile(Resource):
	def get(self, user_id):
		return json.dumps("You got a User profile!")

	def post(self, user_id):
		return json.dumps("You updated a profile!")

class UserChallenges(Resource):
	def get(self, user_id):
		return json.dumps("You got a users challenge history!")

class UserCharities(Resource):
	def get(self, user_id):
		return json.dumps("You got a User's charities!")

	def post(self, user_id):
		return json.dumps("You added a new charity to a user!")

class Challenge(Resource):
	def post(self):
		return json.dumps("Made a new challenge!")

class ChallengeTypes(Resource):
	def get(self):
		return json.dumps("Got the Challenge list!")

class CurrentGames(Resource):
	def get(self):
		return json.dumps("Got the list of current games!")

class Rosters(Resource):
	def get(self, team_id):
		return json.dumps("Got the roster for a team!")

#uri base componets to build full uris
API_BASE = "/api"
USERS_BASE = "/users"
CHALLENGES_BASE = '/challenges'

api.add_resource(LoginUser, API_BASE + '/login')
api.add_resource(Users, API_BASE + USERS_BASE)
api.add_resource(UserProfile, API_BASE + USERS_BASE + '/<user_id>/profile')
api.add_resource(UserChallenges, API_BASE + USERS_BASE +'/<user_id>'+ CHALLENGES_BASE)
api.add_resource(UserCharities, API_BASE + USERS_BASE + '/<user_id>' + '/charities')
api.add_resource(Challenge, API_BASE + CHALLENGES_BASE)
api.add_resource(ChallengeTypes, API_BASE + CHALLENGES_BASE +'/types')
api.add_resource(CurrentGames, API_BASE + '/currentGames')
api.add_resource(Rosters, API_BASE + '/rosters/<team_id>')

if __name__ == "__main__":
    app.run()
