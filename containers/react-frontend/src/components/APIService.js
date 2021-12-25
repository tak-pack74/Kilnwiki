// 【内容】
// 各コンポーネントに呼び出される関数を定義する
// 関数はFlaskに定義したAPIを実行する

export default class APIService{
    // 新規ページの登録処理
    static async insertPage(page_data){
        try {
            const response = await fetch(`http://localhost:5000/insert_page`, {
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
    static async updatePage(id, page_data){
        try {
            const response = await fetch(`http://localhost:5000/update_page/${id}`, {
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
            const response = await fetch(`http://localhost:5000/delete_page/${id}`, {
                method: 'DELETE',
            });
            return await response.json();
        } catch (error) {
            return console.log(error);
        }
    };   

    static async insertTag(tag_data){
        try {
            const response = await fetch(`http://localhost:5000/insert_tag`, {
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
            const response = await fetch(`http://localhost:5000/delete_tag/${id}`, {
                method: 'DELETE',
            });
            return await response.json();
        } catch (error) {
            return console.log(error);
        }
    };   
}