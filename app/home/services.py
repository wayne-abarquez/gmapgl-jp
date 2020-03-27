from .models import Grids
from app import db


def get_grids():
    # query = """SELECT gcol || '' || grow AS id, ST_AsText(geom) AS geom
    #            FROM ST_RegularGrid(ST_GeomFromText('LINESTRING(0 0, 100 100)',0),20,20,FALSE)"""

    #query = """SELECT col || '' || row AS id, ST_AsText(geom) AS geom
    #           FROM ST_CreateFishnet(100, 100, 0.00005, 0.00005, 139.5392763, 35.8345773)"""

    # query = """SELECT row_to_json(fc)
    #            FROM (SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
    #            FROM (SELECT 'Feature' As type,
    #                 ST_AsGeoJSON(lg.geom)::json As geometry,
    #                 row_to_json((SELECT l FROM (SELECT col || '' || row AS id) As l
    #                 )) As properties
    #              FROM ST_CreateFishnet(500, 500, 0.00005, 0.00005, 139.5392763, 35.8345773) As lg   ) As f )  As fc"""

    query = """
            SELECT row_to_json(fc)
            FROM (
                SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
                FROM (
                    SELECT 'Feature' As type,
                    ST_AsGeoJSON(lg.geom)::json As geometry,
                    row_to_json(
                        (SELECT l FROM (SELECT id) As l)
                    ) As properties
                    FROM grids As lg   
                ) As f 
            )  As fc
    """

    result = db.session.execute(query).first()

    return result[0]
