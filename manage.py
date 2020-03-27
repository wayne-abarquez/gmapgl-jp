from flask.ext.script import Manager, prompt_bool
from flask.ext.migrate import Migrate, MigrateCommand

from app import app
from app import db
from app.home.models import Grids
from app.seeds.grid import GridSeeder


manager = Manager(app)
migrate = Migrate(app, db)

manager.add_command('db', MigrateCommand)


@manager.command
def initdb():
    db.create_all()
    print("Initialized the Database")


@manager.command
def dropdb():
    if prompt_bool("Are you sure you want to Drop your Database?"):
        db.drop_all()
        print("Database Dropped")


@manager.option('-r', '--row_count', dest='row_count', default=200)
@manager.option('-c', '--col_count', dest='col_count', default=200)
@manager.option('-x', '--lng', dest='lng', default=139.5392763)
@manager.option('-y', '--lat', dest='lat', default=35.8345773)
def seeddb(row_count, col_count, lng, lat):
    GridSeeder().seed(row_count, col_count, lng, lat)


if __name__ == '__main__':
    manager.run()
