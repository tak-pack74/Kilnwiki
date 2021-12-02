import './App.css';
import { Grid } from "@material-ui/core";

import PageList from './components/pageList';
import ManagementToolbar from './components/Toolbar-Management';
import PageControllToolbar from './components/Toolbar-PageControll';
import PageViewField from './components/PageViewField'
import PageEditField from './components/PageEditField'
import React, { useState }from 'react';

function App() {
  // ---------- state ----------
  const [chosenPage, setChosenPage] = useState({
    id: null,
    title: null,
    description: null,
    body: null,
  });

  const [isPageChosen, setIsPageChosen] = useState(false);
  const [isEditorMode, setIsEditorMode] = useState(false);
  // --------------------------

  // 子コンポーネントPageListで使用するハンドラー関数
  // 記事を選択したときにstateのchosenPageIdを更新する
  const handlePageClick = page => setChosenPage(page);
  const handleNewPageClick = isEditorMode => setIsEditorMode(isEditorMode)

  // render一覧
  const renderPageList = () => {
    return <PageList 
      handlePageClick={handlePageClick}
      />
  };

  // HTMLビューワー
  const renderPageViewField = () => {
    return <PageViewField
      chosenPage={chosenPage}
      />
  }

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <ManagementToolbar
           handleNewPageClick={handleNewPageClick}
          />
        </Grid>
        <Grid item xs={9}>
          <PageControllToolbar />
        </Grid>
        <Grid item xs={3}>
          {renderPageList()}
        </Grid>
        <Grid item xs={9}>
          {isEditorMode
            ? <PageEditField />
            : renderPageViewField() 
          }
        </Grid>
      </Grid>      
    </div>
  );
}

export default App;