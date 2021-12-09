// 【内容】
// 各コンポーネントに呼び出される関数を定義する
// 関数はFlaskに定義したAPIを実行する

export default class APIService{
    // 新規ページの登録処理
    static async insertPage(body){
        try {
            const response = await fetch(`http://localhost:5000/insert_page`, {
                'method': 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            return await response.json();
        } catch (error) {
            return console.log(error);
        }
    };
}