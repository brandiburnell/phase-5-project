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
    
    def patch(self, id):
        item = Item.query.filter_by(id=id).first()
        request_data = request.get_json()
        for attr in request_data:
            if request_data[attr] != "":
                setattr(item, attr, request_data[attr])

        db.session.add(item)
        db.session.commit()

        return make_response(item.to_dict(), 200)

    
    def delete(self, id):
        item = Item.query.filter_by(id=id).first()
        db.session.delete(item)
        
        item_comments = item.comments
        for comment in item_comments:
            db.session.delete(comment)

        db.session.commit()

        make_response('successfuly deleted', 200)
    
class UserByID(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first().to_dict()

        return make_response(user, 200)
    

# ADD PASSWORD HASH WHEN NEW USER IS ADDED/ MODIFY FOR BEING LOGGED IN
    
class Comments(Resource):
    def post(self):
        request_data = request.get_json()
        print(request_data)

        try:
            user = User.query.filter_by(username=request_data['username']).first()

            newComment = Comment(
            item_id = request_data['itemId'],
            description = request_data['description'],
            subject = request_data['subject'],
            user_id = user.id# look up user id from db from user input
            )

            db.session.add(newComment)
            db.session.commit()

            print(newComment)
        except:
            new_user = User(
                username = request_data['username']
            )
            db.session.add(new_user)
            db.session.commit()

            user = User.query.filter_by(username=request_data['username']).first()
            user.password_hash = "password"
            
            newComment = Comment(
            item_id = request_data['itemId'],
            description = request_data['description'],
            subject = request_data['subject'],
            user_id = user.id # look up user id from db from user input
            )

            print(newComment)

            db.session.add(newComment)
            db.session.commit()
        
        return make_response(request_data, 201)

api.add_resource(Home, '/')
api.add_resource(Items, '/items')
api.add_resource(ItemByID, '/items/<int:id>')
api.add_resource(UserByID, '/users/<int:id>')
api.add_resource(Comments, '/comments')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

