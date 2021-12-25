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

  // 右下のフィールドを決定するstate
  // true => Edit フィールド,  false => View フィールド
  const [isEditorMode, setIsEditorMode] = useState(false);

  // ページ一覧
  const renderPageList = () => {
    return <PageList 
        chosenPage={chosenPage}
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

  const gridStyle = {
    border: "1px solid",
    borderColor: "#dcdcdc",
  }

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={3} style={gridStyle}>
          <MenuBar
           setIsEditorMode={setIsEditorMode}
           setChosenPage={setChosenPage}
          />
        </Grid>
        <Grid item xs={9} style={gridStyle}>
          <PageToolbar
            setIsEditorMode={setIsEditorMode}
            chosenPage={chosenPage}
            isEditorMode={isEditorMode}
          />
        </Grid>
        <Grid item xs={3} style={gridStyle}>
          {renderPageList()}
        </Grid>
        <Grid item xs={9} style={gridStyle}>
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