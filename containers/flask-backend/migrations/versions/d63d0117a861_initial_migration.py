"""initial migration

Revision ID: d63d0117a861
Revises: 
Create Date: 2021-12-12 15:13:07.421142

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd63d0117a861'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('page',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=32), nullable=True),
    sa.Column('body', sa.Text(), nullable=True),
    sa.Column('published_at', sa.DateTime(), nullable=True),
    sa.Column('edited_at', sa.DateTime(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('page')
    # ### end Alembic commands ###
