"""add booking model

Revision ID: 3e946485b147
Revises: 6cdea6acc3a8
Create Date: 2024-07-27 13:12:27.408814

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3e946485b147'
down_revision = '6cdea6acc3a8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('bookings',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('start_date', sa.DateTime(), nullable=False),
    sa.Column('end_date', sa.DateTime(), nullable=True),
    sa.Column('item_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['item_id'], ['items.id'], name=op.f('fk_bookings_item_id_items')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_bookings_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('bookings')
    # ### end Alembic commands ###
