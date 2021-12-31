import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemIcon, ListItemText, ListItemButton, Tooltip, Typography, Button } from '@mui/material';
import LabelSharpIcon from '@mui/icons-material/LabelSharp';

import TagSelector from './tag_selector'
import TagEditor from './tag_editor'

import APIService from './APIService'

const PageList = props => {
  const [pages, setPages] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isTagEditorOpened, setIsTagEditorOpened] = useState(false);
  const [isTagSelectorOpened, setIsTagSelectorOpened] = useState(false);

  const handleTagEditorOpen = () => setIsTagEditorOpened(true)
  const handleTagSelectorOpen = () => setIsTagSelectorOpened(true)

  // TODO: ページ一覧の取得処理をAPIService一覧に統合したい
  useEffect(() => {
    let params = [];
    for (let i = 0; i < selectedTags.length; i++) {
      params.push(['selected_tag', selectedTags[i]])
    };

    const query_param = new URLSearchParams(params);

    APIService.fetchPageList(query_param)
    .then(response => setPages(response))
    .catch(error => console.log(error));
  },[props.onPagePost, selectedTags])
  
  // ページ一覧の上のタグ管理フィールド。
  const renderSearchFieldItem = () => {
    return (
      <div key="SearchField">
        <ListItem component="div" disablePadding
          sx={{ borderBottom: 2, borderTop: 2, borderColor: 'grey.600'}}
        >
          
          {/* タグ選択ボタン */}
          <ListItemButton sx={{ height: 56 }} onClick={handleTagSelectorOpen} >
            <ListItemIcon>
              <LabelSharpIcon color="#000000" />
              <Typography variant="h5" sx={{ paddingLeft: 1 }}> {selectedTags.length}</Typography>
            </ListItemIcon>
          </ListItemButton>

          {/* タグ編集ボタン */}
          <Tooltip title="Edit Tags">
            <Button onClick={handleTagEditorOpen} >
              <Typography variant="p">
                Edit
              </Typography>
            </Button>
          </Tooltip>
        </ListItem>

        {/* TODO: 選択ウィンドウと編集ボタンは一つに統合しても良いと思う */}
        {/* タグ選択ボタン押下時に表示するモーダルウィンドウ */}
        <TagSelector
          selectedTags={selectedTags}
          isTagSelectorOpened={isTagSelectorOpened}
          setIsTagSelectorOpened={setIsTagSelectorOpened}
          setSelectedTags={setSelectedTags}
        />

        {/* タグ編集ボタン押下時に表示するモーダルウィンドウ */}
        <TagEditor
          isTagEditorOpened={isTagEditorOpened}
          setIsTagEditorOpened={setIsTagEditorOpened}
        />

      </div>
    )
  };

  const renderPageListItem = () => {
    return (
      <div>
        {pages.map(
          page => (
            <div key={page.id}>
              <ListItem 
                button
                sx={{ 
                  borderBottom: 1,
                  borderRight: page.id === props.chosenPage.id ? 10 : 0,
                  borderColor: 'grey.300',
                }}
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
          minHeight: 850,
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