from flask import jsonify,request
from . import main
from .. import db
from ..models import Page,pages_schema

@main.route('/pages', methods=['GET'])
def pages():
    pages = Page.query.order_by(Page.id.asc()).all()
    results = pages_schema.dump(pages)

    return jsonify(results)

@main.route('/create_new_page', methods=['POST'], strict_slashes=False)
def create_new_page():
    title = request.json['title']
    body = request.json['title']

    page = Page(
        title=title,
        body=body
    )

    db.session.add(page)
    db.session.commit()

    return ("hoge")