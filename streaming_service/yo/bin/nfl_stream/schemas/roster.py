from .. import ma
from ..models.roster import Roster


class RosterSchema(ma.Schema):

    class Meta:
        fields = ('id')


roster_schema = RosterSchema()
rosters_schema = RosterSchema(many=True)
