"""
These Configuration classes are used by create_app.(as below)

    app.config.from_object(config[config_name])

※ config_name is defined by host environment variable FLASK_CONFIG.
e.g. in kubernetes manifest, FLASK_CONFIG should be "kubernetes"
"""

import os

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


# NOTE 以下2つの設定用クラスは、現在内容が同じ。将来の拡張性のために分けているが現状では意味はない。

class DockerComposeConfig(Config):
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://{user}:{password}@{mysql_host}/{db_name}?charset=utf8'.format(**{
        'user': os.environ.get('MYSQL_USER'),
        'password': os.environ.get('MYSQL_PASSWORD'),
        'mysql_host': 'mysql-db', # should be equal to service name in docker-compose.yaml
        'db_name': 'kilnwiki_db', # should be equal to environment variable of mysql container, MYSQL_DATABASE
    })
    DEBUG = False

class KubernetesConfig(Config):
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://{user}:{password}@{mysql_host}/{db_name}?charset=utf8'.format(**{
        'user': os.environ.get('MYSQL_USER'),
        'password': os.environ.get('MYSQL_PASSWORD'),
        'mysql_host': 'mysql-db', #should be equal to the name of service for mysql in manifest files
        'db_name': 'kilnwiki_db', # should be equal to environment variable of mysql container, MYSQL_DATABASE
    })
    DEBUG = False

config = {
    'default': DevelopmentConfig,
    'development': DevelopmentConfig,
    'docker-compose': DockerComposeConfig,
    'kubernetes': KubernetesConfig
}