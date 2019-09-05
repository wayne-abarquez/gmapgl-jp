from .models import Accounts
# from app import db


def get_accounts(limit=1000):
    return Accounts.query.limit(limit).all()
