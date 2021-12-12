import os

class Config:
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://{user}:{password}@{host}/{db_name}?charset=utf8'.format(**{
        'user': os.environ.get('MYSQL_USERNAME'),
        'password': os.environ.get('MYSQL_PASSWORD'),
        'host': os.environ.get('MYSQL_SERVER'),
        'db_name': os.environ.get('MYSQL_DB_NAME')
    })
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    @staticmethod
    def init_app(app):
        pass

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False

class DockerConfig(Config):
    # ホスト名「mysql」はdocker-composeファイルのサービス名
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://{user}:{password}@mysql/{db_name}?charset=utf8'.format(**{
        'user': os.environ.get('MYSQL_USERNAME'),
        'password': os.environ.get('MYSQL_PASSWORD'),
        'db_name': os.environ.get('MYSQL_DB_NAME')
    })

config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'docker': DockerConfig,
    'default': DevelopmentConfig
}