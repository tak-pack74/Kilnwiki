import ReactMarkdown from "react-markdown";

function PageViewField(props) {
  return (
    <div>
      <ReactMarkdown>
          {props.chosenPage.body}
      </ReactMarkdown>
    </div>
  );
};

export default PageViewField;