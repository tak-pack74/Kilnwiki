import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";


/*
// 暫定データ（開発用）-----------------
const createData = (id, title, body ) => {
  return { id, title, body };
};


const pages = [
  createData(1, "Test1", "# hoge"),
  createData(2, "Test2", "## hoge"),
  createData(3, "Test3", "### hoge"),
  createData(4, "Test4", "#### hoge"),
  createData(5, "Test5", "##### hoge"),
];
*/

const PageList = props => {
  const [pages, setPages] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:5000/pages',{
      method: 'GET',
      headers : {
        'Content-Type':'application/json'
      }
    })
    .then(response => response.json())
    .then(response => setPages(response))
    .catch(error => console.log(error))
  },[])
  
  const renderPageListItem = () => {
    return (
      <div>
        {pages.map(
          page => (
            <ListItem button
            onClick={() => props.handlePageClick(page)}
            >
            <ListItemText primary={page.title} secondary={page.body} />
            </ListItem>
          )
        )}
      </div>
    );
  };

  return (
    <div className>
      <List component="nav">
        {renderPageListItem()}
      </List>
    </div>
  );
}

export default PageList