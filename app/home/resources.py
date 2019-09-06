from flask.ext.restful import Resource, abort, marshal_with, marshal
from flask import request
from app import rest_api
from .services import get_grids
from .fields import grid_fields


class GridResource(Resource):
    def get(self):
        """ GET /v1/grids """
        limit = request.args.get('limit', None)

        return marshal(get_grids(limit), grid_fields)


rest_api.add_resource(GridResource, '/v1/grids')
