from flask import render_template, redirect

from . import main
from ..models import Page

@main.route('/', methods=['GET', 'POST'])
def index():
    pages = Page.query.order_by(Page.id.asc()).all()
    return render_template('index.html', pages=pages)
