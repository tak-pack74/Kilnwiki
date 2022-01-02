import os

# 共通設定
class Config:
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    @staticmethod
    def init_app(app):
        pass

class DevelopmentConfig(Config):
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://{user}:{password}@{host}/{db_name}?charset=utf8'.format(**{
        'user': os.environ.get('MYSQL_USER'),
        'password': os.environ.get('MYSQL_PASSWORD'),
        'host': os.environ.get('MYSQL_SERVER'),
        'db_name': os.environ.get('MYSQL_DB_NAME')
    })
    DEBUG = True

# NOTE 以下2つの設定用クラスは、現在内容が同じ。将来の拡張性のために分けているが意味はない。

class DockerComposeConfig(Config):
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://{user}:{password}@{mysql_host}/{db_name}?charset=utf8'.format(**{
        'user': os.environ.get('MYSQL_USER'),
        'password': os.environ.get('MYSQL_PASSWORD'),
        'mysql_host': 'mysql-db', # docker-composeのサービス名
        'db_name': 'kilnwiki_db', # mysqlコンテナの環境変数 MYSQL_DATABASE と同値である必要あり
    })
    DEBUG = False

class KubernetesConfig(Config):
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://{user}:{password}@{mysql_host}/{db_name}?charset=utf8'.format(**{
        'user': os.environ.get('MYSQL_USER'),
        'password': os.environ.get('MYSQL_PASSWORD'),
        'mysql_host': 'mysql-db', # kubernetes マニフェスト mysql用serviceのnameと同値である必要あり
        'db_name': 'kilnwiki_db', # mysqlコンテナの環境変数 MYSQL_DATABASE と同値である必要あり
    })
    DEBUG = False

config = {
    'default': DevelopmentConfig,
    'development': DevelopmentConfig,
    'docker-compose': DockerComposeConfig,
    'kubernetes': KubernetesConfig
}