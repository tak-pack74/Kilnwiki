import React from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";

const createData = (title, body ) => {
  return { title, body };
  }

const pages = [
  createData("Test1", "#hoge"),
  createData("Test2", "##hoge"),
  createData("Test3", "###hoge"),
  createData("Test4", "####hoge"),
  createData("Test5", "#####hoge"),
];

const Header = () => {
  return (
    <div className>
      <List component="nav">
        {pages.map((page) => (
          <ListItem button>
          <ListItemText primary={page.title} secondary={page.body}/>
          </ListItem>
        ))}
      </List>
  </div>
  );
};

export default Header;