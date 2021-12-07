import './App.css';
import { Grid } from "@material-ui/core";

import PageList from './components/page_list';
import ManagementToolbar from './components/toolbar_overall_management';
import PageControllToolbar from './components/toolbar_page_contoll';
import PageViewField from './components/page_view_field';
import PageEditField from './components/page_edit_field';
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
      setIsEditorMode={setIsEditorMode}
      />
  };

  // HTMLビューワー
  const renderPageViewField = () => {
    return <PageViewField
      chosenPage={chosenPage}
      />
  }

  // Markdown編集フィールド
  const renderPageEditField = () => {
    return <PageEditField
    setIsEditorMode={setIsEditorMode}
      />
  }

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <ManagementToolbar
           setIsEditorMode={setIsEditorMode}
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
            ? renderPageEditField()
            : renderPageViewField() 
          }
        </Grid>
      </Grid>      
    </div>
  );
}

export default App;