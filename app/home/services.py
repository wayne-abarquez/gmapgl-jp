from .models import Grids


def get_grids(limit=500):
    return Grids.query.limit(limit).all()
