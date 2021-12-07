from sqlalchemy.orm import column_property
from sqlalchemy.sql import func
from flask_migrate import Migrate

from . import db, ma

class Page(db.Model):
    __tablename__ = 'page'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(32))
    description = db.Column(db.String(128))
    body = db.Column(db.Text)
    published_at = db.Column(db.DateTime)
    edited_at = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)
    
    def __repr__(self):
        return '<Pages %r>' % self.title

class PagesShema(ma.Schema):
    class Meta:
        fields = ("id","title", "body", "description")\

            
pages_schema = PagesShema()
pages_schema = PagesShema(many=True)

""" 将来的に必要な Tagモデル
class Tag(db.Model):
    __tablename__ = 'tag'
    id = db.Column(db.Integer, primary_key=True)
"""