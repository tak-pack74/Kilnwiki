'''
【内容】
・全route (API) の定義
・Reactサーバからのアクセスを受付け、DBへ各種クエリを実行する。
・flaskはwebページを返さず、APIサーバとして振る舞う。
'''

from flask import jsonify,request
from sqlalchemy.orm import load_only

from . import main
from .. import db
from ..models import Page, page_schema, pagelist_schema, Tag, tag_schema, tags_schema

# DBのpageテーブルから全レコード（idとtitleのみ）を取得する
# TODO: idとtitleだけが入ったデータを page_list と名付けて良いものか
# TODO: 選択したタグがついた記事だけを取得するように変更する
@main.route('/fetch_page_list', methods=['GET'])
def fetch_page_list():
    page_list = Page.query.options(load_only('id', 'title')).order_by(Page.id.asc()).all()
    results = pagelist_schema.dump(page_list)

    return jsonify(results)

# DBのpageテーブルからidをキーにページ情報を取得する
@main.route('/fetch_page/<int:id>', methods=['GET'])
def fetch_page(id):
    page = Page.query.filter_by(id=id).first()
    result = page_schema.dump(page)

    return jsonify(result)

# DBへ新規ページのレコードを登録するAPI
@main.route('/insert_page', methods=['POST'], strict_slashes=False)
def insert_page():
    title = request.json['page_title']
    body = request.json['page_body']

    page = Page(
        title=title,
        body=body
    )

    db.session.add(page)
    db.session.commit()

    return page_schema.jsonify(page)

# DBへ更新されたページの情報を反映するAPI
@main.route('/update_page/<int:id>', methods=['PUT'], strict_slashes=False)
def update_page(id):
    page = Page.query.get_or_404(id)
    page.title = request.json['page_title']
    page.body = request.json['page_body']

    db.session.add(page)
    db.session.commit()

    return page_schema.jsonify(page)

@main.route('/drop_page/<int:id>', methods=['DELETE'], strict_slashes=False)
def delete_page(id):
    page = Page.query.get_or_404(id)

    db.session.delete(page)
    db.session.commit()

    return page_schema.jsonify(page)

@main.route('/insert_tag', methods=['POST'], strict_slashes=False)
def insert_tag():
    name = request.json['tag_name']
    description = request.json['tag_description']

    tag = Tag(
        name=name,
        description=description
    )

    db.session.add(tag)
    db.session.commit()

    return tag_schema.jsonify(tag)

@main.route('/fetch_all_tags', methods=['GET'], strict_slashes=False)
def fetch_all_tags():
    tags = Tag.query.all()
    results = tags_schema.dump(tags)

    return jsonify(results)