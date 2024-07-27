#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api

# Add your model imports
from models import Comment, Item, User


# Views go here!
class Home(Resource):
    def get(self):
        return make_response('Welcome to the Gear Bucket API', 200)

api.add_resource(Home, '/')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

