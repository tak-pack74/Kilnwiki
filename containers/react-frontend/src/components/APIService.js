// 【内容】
// HTTPリクエストを実行する関数を定義する。
// 各関数はFlaskに定義したAPIへHTTPリクエストを投げる

import { config_dict } from '../config.js'

const config = config_dict[process.env.REACT_APP_CONFIG_NAME]

export default class APIService{
    /**
     * ページ 新規登録リクエスト
     * @param {object} page_data title(string), body(text), and attached tags(int list).
     * @returns response.json includes data of inserted page record.
     */
    static async insertPage(page_data){
        try {
            const response = await fetch(`${config.flask_url}/api/insert_page`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                body: JSON.stringify(page_data)
            });
            return await response.json();
        } catch (error) {
            return console.log(error);
        }
    };

    /**
     * 単一ページの完全なレコード情報を取得するリクエスト
     * @param {int} page_id 取得対象ページのid。
     * @returns response.json 取得したページのレコード情報
     */
    static async fetchPage(page_id) {
        try {
            const response = await fetch(`${config.flask_url}/api/fetch_page/${page_id}`, {
                method: 'GET',
                headers : {
                  'Content-Type':'application/json'
                },
                mode: 'cors',
            })
            return response.json();
        } catch (error) {
            return console.log(error);
        }
    }

    /**
     * 全ページレコードを取得する。Idカラムと Titleカラムの情報だけが含まれる。
     * タグが選択されている場合、(flask側の処理によって)そのタグと紐づいたページだけが返される。
     * @param {*} query_param クエリパラメータ。今は選択されたタグ(selected_tag)だけが定義
     * @returns response.json()　ページidとtitleを含むオブジェクトの配列。
     */
    static async fetchPageList(query_param) {
        try {
            const response = await fetch(`${config.flask_url}/api/fetch_page_list?${query_param}`, {
                method: 'GET',
                headers : {
                    'Content-Type':'application/json'
                  },
                mode: 'cors',
            })
            return response.json();
        } catch (error) {
            return console.log(error);
        }
    }

    /**
     * ページ 更新リクエスト
     * @param {int} id 更新対象のページのID. flask側で検索処理に用いられる
     * @param {object} page_data title(string), body(text), and attached tags(int list).
     * @returns response.json, updated page record.
     */
    static async updatePage(id, page_data){
        try {
            const response = await fetch(`${config.flask_url}/api/update_page/${id}`, {
                method: 'PUT',
                headers : {
                    'Content-Type':'application/json'
                  },
                mode: 'cors',
                body: JSON.stringify(page_data)
            });
            return await response.json();
        } catch (error) {
            return console.log(error);
        }
    };

    /**
     * ページの削除リクエスト
     * @param {int} id 削除対象のページのid。Flask側で検索処理に用いられる
     * @returns response.json()　削除されたページのレコード情報
     */
    static async deletePage(id){
        try {
            const response = await fetch(`${config.flask_url}/api/delete_page/${id}`, {
                method: 'DELETE',
                mode: 'cors',
            });
            return await response.json();
        } catch (error) {
            return console.log(error);
        }
    };   

    /**
     * タグ 登録リクエスト
     * @param {*} tag_data tag_name(string) tag_description(string)
     * @returns response.json() 登録されたtag のレコードデータ
     */
    static async insertTag(tag_data){
        try {
            const response = await fetch(`${config.flask_url}/api/insert_tag`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                body: JSON.stringify(tag_data)
            });
            return await response.json();
        } catch (error) {
            return console.log(error);
        }
    };

    /**
     * タグ 削除リクエスト
     * @param {int}} id 削除対象タグのid 
     * @returns response.json() 削除された タグのレコード情報
     */
    static async deleteTag(id){
        try {
            const response = await fetch(`${config.flask_url}/api/delete_tag/${id}`, {
                method: 'DELETE',
                mode: 'cors',
            });
            return await response.json();
        } catch (error) {
            return console.log(error);
        }
    };

    /**
     * 全タグのレコード情報を取得するリクエスト
     * ページの取得処理と異なり、全レコードの全カラム情報を取得する(タグは想定される数もカラム数も少ないので)
     * @returns response.json() 全タグレコード情報の配列
     */
    static async fetchAllTags() {
        try {
            const response = await fetch(`${config.flask_url}/api/fetch_all_tags`, {
                method: 'GET',
                headers : {
                  'Content-Type':'application/json'
                },
                mode: 'cors',
            })
            return response.json();
        } catch (error) {
            return console.log(error);
        }
    }

}