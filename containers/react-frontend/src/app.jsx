import './App.css';
import { Grid } from "@material-ui/core";

import PageList from './components/page_list';
import MenuBar from './components/menu_bar';
import PageToolbar from './components/page_toolbar';
import PageViewField from './components/page_view_field';
import PageEditField from './components/page_edit_field';
import React, { useState }from 'react';

function App() {
  // ---------- state ----------
  const [chosenPage, setChosenPage] = useState({
    id: null,
    title: null,
  });

  const [isPageChosen, setIsPageChosen] = useState(false);

  // 右下のフィールドを決定するstate
  // true => Edit フィールド,  false => View フィールド
  const [isEditorMode, setIsEditorMode] = useState(false);

  // ページ一覧
  const renderPageList = () => {
    return <PageList 
      setChosenPage={setChosenPage}
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
      setChosenPage={setChosenPage}
      chosenPage={chosenPage}
      />
  }

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <MenuBar
           setIsEditorMode={setIsEditorMode}
           setChosenPage={setChosenPage}
          />
        </Grid>
        <Grid item xs={9}>
          <PageToolbar
            setIsEditorMode={setIsEditorMode}
            isEditorMode={isEditorMode}
          />
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