"""
Defines API routes.
In all of the routes, flask query to Mysql Container, 
and return jsonified data.
"""

from flask import jsonify,request
from sqlalchemy import func
from sqlalchemy.orm import load_only

from . import main
from .. import db
from ..models import Page, page_schema, pagelist_schema, Tag, tag_schema, tags_schema, PageTagMap


@main.route('/api/insert_page', methods=['POST'], strict_slashes=False)
def insert_page():
    """
    INSERT single page INTO Page table, and
    INSERT attached tags  INTO PageTagMap table

    parameters:
    ---------
    page_title : string(up to 32 bytes)
        gotten from request body, defines title of page.

    page_body : text
        gotten from request body, defines content of page.

    selected_tags : list of int
        gotten from request body, 
        list includes index of tag item.

    Returns
    ---------
    page : seriarized page data
        includes all column data of Page table.
    
    tags : list of int
        list of tag ids. equals to received selected_tags
    """

    title = request.json['page_title']
    body = request.json['page_body']
    tags = request.json['selected_tags']
    
    page = Page(title=title,body=body)
    db.session.add(page)
    db.session.commit()

    page_tag_maps = []
    for tag in tags:
        page_tag_map = PageTagMap(
            page_id = page.id,
            tag_id = tag
        )
        page_tag_maps.append(page_tag_map)
    
    db.session.add_all(page_tag_maps)
    db.session.commit()

    return jsonify(
        {
            'page': page_schema.dump(page),
            'tags': tags
        }
    );

@main.route('/api/fetch_page_list', methods=['GET'])
def fetch_page_list():
    """
    (selected_tag is empty) 
        -> fetches all Page-table record and return id and page_title.
    (selected_tag is in query parameter)
        -> タグと紐づいたPageだけをPage テーブルから抽出して id と page_titleを返す

    Parameters
    --------------
    selected_tags : list f int
        [e.g] ?selected_tag=1&selected_tag=4  => [1,4]

    Return
    --------------
    page_list : seriarized list of page object
    """

    # ?selected_tag=1&selected_tag=4  => [1,4]
    selected_tags = request.args.getlist(key='selected_tag', type=int)

    if len(selected_tags) != 0:
        page_list = Page.query\
            .join(PageTagMap, Page.id == PageTagMap.page_id)\
            .join(Tag, Tag.id == PageTagMap.tag_id)\
            .filter(PageTagMap.tag_id.in_(selected_tags))\
            .group_by(Page.id)\
            .having(func.count(Tag.id) == len(selected_tags))\
            .options(load_only('id', 'title')).order_by(Page.id.asc()).all()
    else:
        page_list = Page.query.options(load_only('id', 'title')).order_by(Page.id.asc()).all()

    return jsonify(pagelist_schema.dump(page_list));


@main.route('/api/fetch_page/<int:id>', methods=['GET'])
def fetch_page(id):
    """
    returns Page record with specified id.

    Parameters
    ----------
    id : int
    gotten from url parameter, specifies a page to return.

    Return
    ----------
    page : seriarized page data
        page record with entire column.
    """
    page = Page.query.filter_by(id=id).first()
    
    page_tag_maps = PageTagMap.query.filter(PageTagMap.page_id == page.id).options(load_only('tag_id')).all()
    tags = []
    for page_tag_map in page_tag_maps:
        tags.append(page_tag_map.tag_id)

    return jsonify(
        {
            'page': page_schema.dump(page),
            'tags': tags
        }
    );

@main.route('/api/update_page/<int:id>', methods=['PUT'], strict_slashes=False)
def update_page(id):
    """
    parameters:
    ---------
    page_title : string(up to 32 bytes)
        gotten from request body, defines title of page.

    page_body : text
        gotten from request body, defines content of page.

    selected_tags : list of int
        gotten from request body, 
        list includes index of tag item.

    Returns
    ---------
    page : seriarized page data
        includes all column data of Page table.
    
    tags : list of int
        list of tag ids. equals to received selected_tags
    """
    page = Page.query.get_or_404(id)
    page.title = request.json['page_title']
    page.body = request.json['page_body']
    selected_tags = request.json['selected_tags']

    # TODO: 重複回避のために TagとPage紐付けを一度すべて削除している。upsert的なものを使うなどもっと上品で軽い方法があると思う。
    # TODO: 処理内容がdrop_pageの中間テーブルのレコード削除処理と重複しているので関数化を検討
    page_tag_maps = PageTagMap.query.filter(PageTagMap.page_id == page.id).all()
    for page_tag_map in page_tag_maps:
        db.session.delete(page_tag_map);
    db.session.commit();

    page_tag_maps = []
    for selected_tag in selected_tags:
        page_tag_map = PageTagMap(
            page_id = page.id,
            tag_id = selected_tag
        )
        page_tag_maps.append(page_tag_map);
    
    db.session.add_all(page_tag_maps);
    db.session.add(page);
    db.session.commit();


    return jsonify(
        {
            'page': page_schema.dump(page),
            'tags': selected_tags
        }
    );

@main.route('/api/delete_page/<int:id>', methods=['DELETE'], strict_slashes=False)
def delete_page(id):
    """
    Drops Page record with specified id.

    Parameters
    ----------
    id : int
    gotten from url parameter, specifies a page to delete.

    Return
    ----------
    page : seriarized page data
        deleted page record.
    """
    page = Page.query.get_or_404(id)

    page_tag_maps = PageTagMap.query.filter(PageTagMap.page_id == page.id).all()
    for page_tag_map in page_tag_maps:
        db.session.delete(page_tag_map)
    
    db.session.delete(page)
    db.session.commit()

    return page_schema.jsonify(page)

@main.route('/api/insert_tag', methods=['POST'], strict_slashes=False)
def insert_tag():
    """ Insert a tag record Into Tag Table, and return it. """
    name = request.json['tag_name']
    description = request.json['tag_description']

    tag = Tag(name=name, description=description)

    db.session.add(tag)
    db.session.commit()

    return tag_schema.jsonify(tag);

@main.route('/api/fetch_all_tags', methods=['GET'], strict_slashes=False)
def fetch_all_tags():
    """ Fetches all the Tag record and return it. """
    tags = Tag.query.all()
    results = tags_schema.dump(tags)

    return jsonify(results);

@main.route('/api/delete_tag/<int:id>', methods=['DELETE'], strict_slashes=False)
def delete_tag(id):
    """
    Drops a Tag record with specified id.

    Parameters
    ----------
    id : int
    gotten from url parameter, specifies a tag to delete.

    Return
    ----------
    page : seriarized page data
        deleted tag record.
    """
    tag = Tag.query.get_or_404(id)

    page_tag_maps = PageTagMap.query.filter(PageTagMap.tag_id == tag.id).all()
    for page_tag_map in page_tag_maps:
        db.session.delete(page_tag_map)
    
    db.session.delete(tag)
    db.session.commit()

    return page_schema.jsonify(tag);