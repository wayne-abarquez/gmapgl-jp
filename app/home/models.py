from app import db
from app.utils.orm_object import OrmObject
from geoalchemy2 import Geometry


class Grids(db.Model, OrmObject):
    id = db.Column(db.BigInteger, primary_key=True)
    geom = db.Column(Geometry('Geometry'))
