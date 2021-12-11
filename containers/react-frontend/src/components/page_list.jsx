import React, { useState, useEffect, useAlert } from "react";
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';

import APIService from '../components/APIService'

const PageList = props => {
  const [pages, setPages] = useState([]);

  // TODO: ページ一覧の取得処理をAPIService一覧に統合したい
  useEffect(() => {
    fetch('http://localhost:5000/fetch_page_list',{
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
            <div>
            <ListItem 
              button
              sx={{
               borderBottom: 1,
               borderColor: 'grey.300',
              }}
              onClick={() => {
                props.setChosenPage(page);
                props.setIsEditorMode(false);
              }}
            >
              <ListItemText
                primary={page.title}
                sx={{
                  height: '100%'
                }}
              />
            </ListItem>
            </div>
          )
        )}
      </div>
  );
  };

  // TODO: デザインがダサい。ウィンドウが小さくなった場合にスクロールバーが表示されるように
  return (
    <div>
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