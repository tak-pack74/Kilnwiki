import ReactMarkdown from "react-markdown";

const body = `
## タイトル1
* おはよう。
* おはよう。
* おはよう。
* おはよう。
* おはよう。
* おはよう。
* おはよう。
* おはよう。
* おはよう。
## タイトル2
1. こんにちは。
2. こんにちは。
3. こんにちは。
1. こんにちは。
2. こんにちは。
3. こんにちは。
1. こんにちは。
2. こんにちは。
3. こんにちは。
## タイトル3
#### こんばんは
#### こんばんは　
#### こんばんは
#### こんばんは　
#### こんばんは　
#### こんばんは
`

const pageViewField = () => {
  return (
    <div>
      <ReactMarkdown>
          {body}
      </ReactMarkdown>
    </div>
  );
};

export default pageViewField;