import './App.css';
import { Grid } from "@material-ui/core";

import PageList from './components/pageList';

import ManagementToolbar from './components/Toolbar-Management';
import PageControllToolbar from './components/Toolbar-PageControll';
import PageViewField from './components/PageViewField'

function App() {
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
          <PageList />
        </Grid>
        <Grid item xs={9}>
          <PageViewField />
        </Grid>
      </Grid>      
    </div>
  );
}

export default App;