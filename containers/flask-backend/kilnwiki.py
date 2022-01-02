import os

from flask_migrate import Migrate, upgrade

from app import create_app, db


app = create_app(os.getenv('FLASK_CONFIG') or 'default')
migrate = Migrate(app, db)

@app.cli.command()
def deploy():
    """ Run deployment tasks. (There's just one task for now.)"""

    # Migrate database to latest version.
    upgrade()