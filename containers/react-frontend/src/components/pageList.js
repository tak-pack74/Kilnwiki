import React from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";

// 暫定データ（開発用）
  
const createData = (id, title, body ) => {
  return { id, title, body };
};

const pages = [
  createData(1, "Test1", "#hoge"),
  createData(2, "Test2", "##hoge"),
  createData(3, "Test3", "###hoge"),
  createData(4, "Test4", "####hoge"),
  createData(5, "Test5", "#####hoge"),
];

class PageList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {};
  }

  renderPageListItem () {
    return (
      <div>
        {pages.map(
          (page) => (
            <ListItem button
            onClick={() => this.props.handlePageClick(page)}
            >
            <ListItemText primary={page.title} secondary={page.body} />
            </ListItem>
          )
        )}
      </div>
    );
  };

  render () {
    return (
      <div className>
        <List component="nav">
          {this.renderPageListItem()}
        </List>
      </div>
    );
  };
}

export default PageList;