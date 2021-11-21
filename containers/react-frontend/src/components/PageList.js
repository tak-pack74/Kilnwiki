import React from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";

const Header = () => {
  return (
    <div className>
    <List component="nav">
      <ListItem>
        <ListItemText primary="List 1" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="List 2 (button)" />
      </ListItem>
      <ListItem disabled>
        <ListItemText primary="List 3 (disabled)" />
      </ListItem>
      <ListItem selected>
        <ListItemText primary="List 4 (selected)" />
      </ListItem>
      <ListItem divider>
        <ListItemText primary="List 5 (divider)" />
      </ListItem>
    </List>
  </div>
  );
};

export default Header;