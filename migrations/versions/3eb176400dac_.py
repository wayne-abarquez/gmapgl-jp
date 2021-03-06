"""empty message

Revision ID: 3eb176400dac
Revises: None
Create Date: 2020-03-27 13:28:37.928776

"""

# revision identifiers, used by Alembic.
revision = '3eb176400dac'
down_revision = None

from alembic import op
import sqlalchemy as sa
import geoalchemy2


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.create_table('grids',
    sa.Column('id', sa.BigInteger(), nullable=False),
    sa.Column('geom', geoalchemy2.types.Geometry(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('grids')
    ### end Alembic commands ###
