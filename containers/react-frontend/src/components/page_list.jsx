import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemIcon, ListItemText, ListItemButton, Tooltip, Typography, Modal, Box, Button } from '@mui/material';
import LabelSharpIcon from '@mui/icons-material/LabelSharp';

const PageList = props => {
  const [pages, setPages] = useState([]);
  const [tagEditorOpened, setTagEditorOpened] = useState(false);

  const handleTagEditorClose = () => setTagEditorOpened(false)
  const handleTagEditorOpen = () => setTagEditorOpened(true)

  const tagEditorStyle = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '60%',
    width: '60%',
    minheight: 300,
    minwidth: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    p: 4,
  };

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
  
  // ページ一覧の上のタグ管理フィールド。
  const renderSearchFieldItem = () => {
    return (
      <div>
        <ListItem component="div" disablePadding
          sx={{
            borderBottom: 2,
            borderTop: 2,
            borderColor: 'grey.300',
          }}>
          
          {/* タグ選択ボタン */}
          <ListItemButton sx={{ height: 56 }}>
            <ListItemIcon>
              <LabelSharpIcon color="#000000" />
            </ListItemIcon>
          </ListItemButton>

          {/* タグ編集ボタン */}
          <Tooltip title="Edit Tags">
            <Button
              onClick={handleTagEditorOpen}  
            >
              <Typography variant="p">
                Edit
              </Typography>
            </Button>
          </Tooltip>
        </ListItem>

        {/* タグ編集ボタン押下時に表示するモーダルウィンドウ */}
        <Modal
            open={tagEditorOpened}
            onClose={handleTagEditorClose}
        >
          <Box sx={tagEditorStyle}>
              hoge
          </Box>
        </Modal>
      </div>
    )
  };

  const renderPageListItem = () => {
    return (
      <div>
        {pages.map(
          page => (
            <div>
              <ListItem 
                button
                sx={{ borderBottom: 1, borderColor: 'grey.300' }}
                onClick={() => {
                  props.setChosenPage(page);
                  props.setIsEditorMode(false);
                }}
              >
                <ListItemText primary={page.title} sx={{ height: '100%'}}/>
              </ListItem>
            </div>
          )
        )}
      </div>
  );
};

  // TODO: デザインがダサい。
  return (
    <div>
      <List
        sx={{
          maxHeight: 850,
          position: 'relative',
          overflow: 'auto',
        }}
      >
        {renderSearchFieldItem()}
        {renderPageListItem()}
      </List>
    </div>
  );
};

export default PageList