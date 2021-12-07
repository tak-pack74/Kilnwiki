import React, { useState, useEffect } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import EditIcon from '@mui/icons-material/Edit';

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
             onClick={() => {
               props.handlePageClick(page);
               props.setIsEditorMode(false);
              }}
             sx={{
              borderRight: 1,
              borderRadius: 1,
              borderColor: 'grey.500',
             }}
             >
              <ListItemText primary={page.title} secondary={page.body} />
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