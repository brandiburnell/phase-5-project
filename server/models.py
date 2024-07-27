from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-_password_hash',)

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String)

    @hybrid_property
    def password_hash(self):
        raise Exception('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))


    # reviews = db.relationship('Review', backref='user')

    def __repr__(self):
        return f'<User {self.id}, {self.username}>'

class Item(db.Model, SerializerMixin):
    __tablename__ = 'items'

    # serialize_rules = ('-reviews.book', '-reviews.user')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    year_purchased = db.Column(db.Integer, nullable=False)
    image_url = db.Column(db.String)

    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    # reviews = db.relationship('Review', backref='book')

    def __repr__(self):
        return f'<Item {self.id}, {self.name}: {self.description}, {self.year_purchased}, {self.image_url}, {self.owner_id}>'
    
class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    subject = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    item_id = db.Column(db.Integer, db.ForeignKey('items.id'))

    def __repr__(self):
        return f'<Comment {self.id}, {self.subject}: {self.description}>'