'''
【内容】
・全route (API) の定義
・Reactサーバからのアクセスを受付け、DBへ各種クエリを実行する。
・flaskはwebページを返さず、APIサーバとして振る舞う。
'''

from flask import jsonify,request
from . import main
from .. import db
from ..models import Page,page_schema,pages_schema

# DBのpageテーブルから全レコードを取得する
# TODO: 選択したタグがついた記事だけを取得するように変更する
@main.route('/fetch_pages', methods=['GET'])
def fetch_pages():
    pages = Page.query.order_by(Page.id.asc()).all()
    results = pages_schema.dump(pages)

    return jsonify(results)

# DBへ新規ページのレコードを登録するAPI
@main.route('/insert_page', methods=['POST'], strict_slashes=False)
def insert_page():
    title = request.json['title']
    body = request.json['title']

    page = Page(
        title=title,
        body=body
    )

    db.session.add(page)
    db.session.commit()

    return page_schema.jsonify(page)

# DBへ更新されたページの情報を反映するAPI
@main.route('/update_page', methods=['PUT'], strict_slashes=False)
def update_page():
    id = request.json['id']
    title = request.json['title']
    body = request.json['title']