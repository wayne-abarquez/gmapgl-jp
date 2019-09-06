from flask.ext.restful import fields
from app.utils.gis_json_fields import WktPolygonToLatLngArray


grid_fields = dict(
    id=fields.String,
    geom=WktPolygonToLatLngArray(attribute='geom')
)
