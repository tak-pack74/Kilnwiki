from sqlalchemy.orm import column_property
from . import db

class Page(db.Model):
    __tablename__ = 'page'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(20))
    body = db.Column(db.Text)
    
    def __repr__(self):
        return '<Role %r>' % self.name

"""
class Tag(db.Model):
    __tablename__ = 'tag'
    id = db.Column(db.Integer, primary_key=True)
"""