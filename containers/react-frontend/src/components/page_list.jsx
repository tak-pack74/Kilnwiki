import React, { useState, useEffect, useAlert } from "react";
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';

import APIService from '../components/APIService'

const PageList = props => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    pages = APIService.fetchPages
    setPages(pages)
  },[]);
  const renderPageListItem = () => {
    return (
      <div>
        {pages.map(
          page => (
            <ListItem 
             button
             sx={{
              borderRight: 1,
              borderRadius: 1,
              borderColor: 'grey.500',
             }}
             secondaryAction={
              <IconButton edge="end">
                <CreateIcon 
                  onClick={() => props.setIsEditorMode(true)}
                />
              </IconButton>
             }
            >

              <ListItemText
               primary={page.title}
               secondary={page.body}
               onClick={() => {
                props.handlePageClick(page);
                props.setIsEditorMode(false);
               }}
              />

            </ListItem>
          )
        )}
      </div>
    );
  };

  // TODO: デザインがダサい。ウィンドウが小さくなった場合にスクロールバーが表示されるように
  return (
    <div className>
      <List
       component="nav"
       sx={{
         borderTop: 1,
         borderColor: 'grey.500',
         maxHeight: 850,
         position: 'relative',
         overflow: 'auto',
       }}
       >
        {renderPageListItem()}
      </List>
    </div>
  );
}

export default PageList