import './App.css';
import { Grid } from "@material-ui/core";

import PageList from './components/pageList';
import ManagementToolbar from './components/Toolbar-Management';
import PageControllToolbar from './components/Toolbar-PageControll';
import PageViewField from './components/PageViewField'
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      chosenPage: {
        id: null,
        body: null,
        title: null,
      },
      isPageChosen: false,
    };
  }

  // 子コンポーネントPageListで使用するハンドラー関数
  // 記事を選択したときにstateのchosenPageIdを更新する
  handlePageClick = page => {
    this.setState({
      chosenPage: page
    })
  }

  // render一覧
  renderPageList() {
    return <PageList 
      handlePageClick={this.handlePageClick}
      />
  }

  renderPageViewField() {
    return <PageViewField
      chosenPage={this.state.chosenPage}
      />
  }

  render() {
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
            {this.renderPageList()}
          </Grid>
          <Grid item xs={9}>
            {this.renderPageViewField()}
          </Grid>
        </Grid>      
      </div>
    );
  };
}

export default App;