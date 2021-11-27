from flask import jsonify
from . import main
from ..models import Page,pages_schema

@main.route('/pages', methods=['GET'])
def pages():
    pages = Page.query.order_by(Page.id.asc()).all()
    results = pages_schema.dump(pages)

    return jsonify(results)