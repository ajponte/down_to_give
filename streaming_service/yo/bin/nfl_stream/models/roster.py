class Roster(object):

    def __init__(self, id):
        self.id = id
        # Additional fields

    def __repr__(self):
        return 'Roster {}>'.format(self.id)
