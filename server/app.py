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
    
class Items(Resource):
    def get(self):
        items = [item.to_dict() for item in Item.query.all()]

        return make_response(items, 200)
    
    def post(self):
        request_data = request.get_json()
        newItem = Item(
            name=request_data['name'],
            description=request_data['description'],
            year_purchased=request_data['yearPurchased'],
            image_url=request_data['imageUrl'],
            owner_id=request_data['ownerId']
        )
        
        db.session.add(newItem)
        db.session.commit()

        return make_response(newItem.to_dict(), 201)
    
class ItemByID(Resource):
    def get(self, id):
        item = Item.query.filter_by(id=id).first().to_dict()

        return make_response(item, 200)

api.add_resource(Home, '/')
api.add_resource(Items, '/items')
api.add_resource(ItemByID, '/items/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

