import './App.css';
import { Grid } from "@material-ui/core";

import PageList from './components/pageList';
import ManagementToolbar from './components/Toolbar-Management';
import PageControllToolbar from './components/Toolbar-PageControll';
import PageViewField from './components/PageViewField'
import React, { useState }from 'react';

function App() {
  const [chosenPage, setChosenPage] = useState({
    id: null,
    title: null,
    description: null,
    body: null,
    
  });

  const [isPageChosen, setIsPageChosen] = useState(false);

  // 子コンポーネントPageListで使用するハンドラー関数
  // 記事を選択したときにstateのchosenPageIdを更新する
  const handlePageClick = page => setChosenPage(page);

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
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <ManagementToolbar />
        </Grid>
        <Grid item xs={9}>
          <PageControllToolbar />
        </Grid>
        <Grid item xs={3}>
          {renderPageList()}
        </Grid>
        <Grid item xs={9}>
          {renderPageViewField()}
        </Grid>
      </Grid>      
    </div>
  );
}

export default App;