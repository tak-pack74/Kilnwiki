'''
【内容】
・SQL Alchemy のモデル定義
・CRUD操作時のデータシリアライズのためのスキーマ定義
'''

from datetime import datetime

from sqlalchemy.orm import relationship

from . import db, marshmallow

# 記事のタイトル・内容・登録更新日時を扱うテーブル
# TODO 将来の拡張性のためpublished_atとcreated_at の両方を準備しているが、使いみちがよくわからない。
class Page(db.Model):
    __tablename__ = 'page'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(32))
    body = db.Column(db.Text)
    published_at = db.Column(db.DateTime, default=datetime.now)
    edited_at = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime)

    page_tag_map = relationship("PageTagMap", back_populates="page")
    
    def __repr__(self):
        return '<Page %r>' % self.title

# marshmallowスキーマを生成するためのクラス。主にroutes.py で ページデータのシリアライズに利用する
## 全ページのスキーマ（id, titleのみ）
class PageListSchema(marshmallow.Schema):
    class Meta:
        fields = ("id","title")

pagelist_schema = PageListSchema(many=True)

## 単一ページのスキーマ（詳細）
class PageSchema(marshmallow.Schema):
    class Meta:
        fields = ("id","title", "body", "published_at", "edited_at")

page_schema = PageSchema()

# タグ。名前(name)と説明(desription)を持ち、ページと紐づく。
class Tag(db.Model):
    __tablename__ = 'tag'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(32))
    description = db.Column(db.String(256))
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime)

    page_tag_map = relationship("PageTagMap", back_populates="tag")
    
    def __repr__(self):
        return '<Tag %r>' % self.name

class TagSchema(marshmallow.Schema):
    class Meta:
        fields = ("id","name", "description")

tag_schema = TagSchema()
tags_schema = TagSchema(many=True)

# ページとタグの中間テーブル。いわゆるTOXI法でページとタグの関連付けを表現する
class PageTagMap(db.Model):
    __tablename__  = 'page_tag_map'
    id = db.Column(db.Integer, primary_key=True)
    page_id = db.Column(db.Integer, db.ForeignKey('page.id'))
    tag_id = db.Column(db.Integer, db.ForeignKey('tag.id'))
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime)

    page = relationship("Page", back_populates="page_tag_map")
    tag = relationship("Tag", back_populates="page_tag_map")

    def __repr__(self):
        return '<PageTagMap %r>' % self.title