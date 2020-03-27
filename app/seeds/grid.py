from app import db


class GridSeeder:

    def seed(self, row_count, col_count, lng, lat):
        query = """INSERT INTO grids(geom)
                   SELECT geom FROM ST_CreateFishnet({row_count}, {col_count}, 0.00005, 0.00005, {lng}, {lat})""".format(row_count=row_count, col_count=col_count, lng=lng, lat=lat)
        db.engine.execute(query)
