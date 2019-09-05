from flask.ext.restful import Resource, abort, marshal_with, marshal
from flask import request
from app import rest_api
from .services import get_accounts
from .fields import account_fields


class AccountsResource(Resource):
    def get(self):
        """ GET /accounts """
        limit = request.args.get('limit')
        return marshal(get_accounts(limit), account_fields)


rest_api.add_resource(AccountsResource, '/api/accounts')
