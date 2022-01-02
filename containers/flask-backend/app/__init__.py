from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS

from config import config

db = SQLAlchemy()
marshmallow = Marshmallow() # シリアライズ処理用 主にrouteで使用
cors = CORS()

def create_app(config_name):
    """
    Flask application factory.
    This function instantiate Flask app, configures it,
    initializes extensions, and register routes.

    Parameters
    ----------
    config_name : string
        Defined by environment variable FLASK_CONFIG.
        Switches config class to use in the environment
        (such as 1]kubernetes, 2]docker-compose, 3]development).
    
    Returns
    ----------
    app : Flask Application Instance
    """

    app = Flask(__name__)
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)
    
    # Initializes the application with the extensions.（よくわからない）
    db.init_app(app)
    cors.init_app(app)
    marshmallow.init_app(app)

    # main/init.py から Blueprint インスタンス（routeの定義）を読み込む
    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)
    
    return app