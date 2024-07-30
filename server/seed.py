#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker
import faker_commerce

# Local imports
from app import app
from models import db, User, Comment, Item, Booking

if __name__ == '__main__':
    fake = Faker()
    fake.add_provider(faker_commerce.Provider)

    with app.app_context():

        # Seed code goes here!
        print("Deleting all records...")
        Comment.query.delete()
        Item.query.delete()
        User.query.delete()
        Booking.query.delete()

        print("Starting seed...")

        print('Adding users...')
        # add User seed data
        users = []
        usernames = []

        for i in range(10):
            username = fake.first_name().lower() + fake.last_name().lower()

            user = User(
                username=username
            )

            user.password_hash = fake.password()

            users.append(user)

        db.session.add_all(users)

        print('Users added!')

        print('Adding items...')
        # add Item seed data
        items = []
        for i in range (20):
            name_with_period=fake.text(max_nb_chars=20)
            item = Item(
                name=name_with_period[:-1],
                description=fake.paragraph(nb_sentences=3),
                year_purchased=fake.year(),
                image_url=fake.image_url(),
                owner_id=fake.random_digit_not_null()
            )

            items.append(item)

        db.session.add_all(items)

        print('Items added!')

        # add Comment seed data
        print('Adding comments...')
        comments = []
        for i in range (20):
            comment = Comment(
                subject=fake.text(max_nb_chars=20),
                description=fake.paragraph(nb_sentences=3),
            )

            comment.user = rc(users)
            comment.item = rc(items)

            comments.append(comment)

        db.session.add_all(comments)

        print('Comments added!')

        print('Committing all data...')

        db.session.commit()
        print('Complete.')

