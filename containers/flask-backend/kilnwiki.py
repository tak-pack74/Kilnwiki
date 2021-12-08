'''
【内容】
・flask run で実行されるApplicationインスタンスを作成しているだけ
'''

import os

from flask_migrate import Migrate

from app import create_app, db

# 環境変数の値に応じてconfigの値は分岐する
app = create_app(os.getenv('FLASK_CONFIG') or 'default')
migrate = Migrate(app, db)