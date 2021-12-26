// 【内容】
// 各コンポーネントに呼び出される関数を定義する
// 関数はFlaskに定義したAPIを実行する

import { config_dict } from '../config.js'

const config = config_dict[process.env.REACT_APP_CONFIG_NAME]

export default class APIService{
    // 新規ページの登録処理

    static async insertPage(page_data){
        try {
            const response = await fetch(`${config.flask_url}/api/insert_page`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(page_data)
            });
            return await response.json();
        } catch (error) {
            return console.log(error);
        }
    };

    static async fetchPage(page_id) {
        try {
            const response = await fetch(`${config.flask_url}/api/fetch_page/${page_id}`, {
                method: 'GET',
                headers : {
                  'Content-Type':'application/json'
                }
            })
            return response;
        } catch (error) {
            return console.log(error);
        }
    }

    static async fetchPageList(query_param) {
        try {
            const response = await fetch(`${config.flask_url}/api/fetch_page_list?${query_param}`, {
                method: 'GET',
                headers : {
                  'Content-Type':'application/json'
                }
            })
            return response;
        } catch (error) {
            return console.log(error);
        }
    }

    static async updatePage(id, page_data){
        try {
            const response = await fetch(`${config.flask_url}/api/update_page/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(page_data)
            });
            return await response.json();
        } catch (error) {
            return console.log(error);
        }
    };   
    static async deletePage(id){
        try {
            const response = await fetch(`${config.flask_url}/api/delete_page/${id}`, {
                method: 'DELETE',
            });
            return await response.json();
        } catch (error) {
            return console.log(error);
        }
    };   

    static async insertTag(tag_data){
        try {
            const response = await fetch(`${config.flask_url}/api/insert_tag`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(tag_data)
            });
            return await response.json();
        } catch (error) {
            return console.log(error);
        }
    };

    static async deleteTag(id){
        try {
            const response = await fetch(`${config.flask_url}/api/delete_tag/${id}`, {
                method: 'DELETE',
            });
            return await response.json();
        } catch (error) {
            return console.log(error);
        }
    };

    static async fetchAllTags() {
        try {
            const response = await fetch(`${config.flask_url}/api/fetch_all_tags`, {
                method: 'GET',
                headers : {
                  'Content-Type':'application/json'
                }
            })
            return response;
        } catch (error) {
            return console.log(error);
        }
    }

}