import os

from app import create_app
#from app.models import Page

app = create_app(os.getenv('FLASK_CONFIG') or 'default')