export default class APIService{
    // Insert an article
    static async newPage(body){
        try {
            const response = await fetch(`http://localhost:5000/create_new_page`, {
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
    }
}