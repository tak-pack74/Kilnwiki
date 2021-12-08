'''
【内容】
・kilnwiki.pyに呼び出される、Application インスタンス作成用関数
・
'''

from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS

from config import config

db = SQLAlchemy()
marshmallow = Marshmallow() # シリアライズ処理用 主にrouteで使用
cors = CORS()

def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)
    
    # 拡張機能の初期化処理（よくわからない）
    db.init_app(app)
    marshmallow.init_app(app)
    cors.init_app(app)

    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)
    
    return app