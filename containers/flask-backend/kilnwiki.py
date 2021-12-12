'''
【内容】
・flask run で実行されるApplicationインスタンスを作成
'''

import os

from flask_migrate import Migrate, upgrade

from app import create_app, db
from app.models import Page

app = create_app(os.getenv('FLASK_CONFIG') or 'default')
migrate = Migrate(app, db)

@app.cli.command()
def deploy():
    upgrade()