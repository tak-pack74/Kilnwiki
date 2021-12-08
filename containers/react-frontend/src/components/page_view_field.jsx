import ReactMarkdown from "react-markdown";
import MDEditor from '@uiw/react-md-editor';

const PageViewField = props => {
  return (
    <div>
      <MDEditor.Markdown source={props.chosenPage.body} />  
    </div>
  );
};

export default PageViewField;