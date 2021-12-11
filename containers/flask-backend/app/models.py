'''
【内容】
・SQL Alchemy のモデル定義
・CRUD操作時のデータシリアライズのためのスキーマ定義
'''

from datetime import datetime

from . import db, marshmallow

# 記事のタイトル・内容・登録更新日時を扱うテーブル
# TODO 将来の拡張性のためpublished_atとcreated_at の両方を準備しているが、20211208現在未利用。
class Page(db.Model):
    __tablename__ = 'page'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(32))
    body = db.Column(db.Text)
    published_at = db.Column(db.DateTime, default=datetime.now)
    edited_at = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime)
    
    def __repr__(self):
        return '<Page %r>' % self.title

# marshmallowスキーマを生成するためのクラス
# 主に routes.py で ページデータのシリアライズに利用する

# ページ一覧
class PageListSchema(marshmallow.Schema):
    class Meta:
        fields = ("id","title")

pagelist_schema = PageListSchema(many=True)

# 単一ページの詳細情報
class PageSchema(marshmallow.Schema):
    class Meta:
        fields = ("id","title", "body", "published_at", "edited_at")

page_schema = PageSchema()


""" 将来的に必要な Tagモデル
class Tag(db.Model):
    __tablename__ = 'tag'
    id = db.Column(db.Integer, primary_key=True)
"""