from flask.ext.restful import fields
from app.utils.gis_json_fields import PointToLatLng


grid_fields = dict(
    id=fields.String,
    geom=PointToLatLng(attribute='geom')
)
