from flask import jsonify, request

from . import api
from ..models.roster import Roster
from ..schemas.roster import roster_schema, rosters_schema


@api.route('/rosters', methods=['GET'])
def get_rosters():
    pass


@api.route('/rosters/<int:id>', methods=['GET'])
def get_roster(id):
    pass
