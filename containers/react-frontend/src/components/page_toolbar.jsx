import React from "react";
import { Toolbar, Button, Grid } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';

const pageToolbar = props => {
  const renderPageEditButton = () => {
    return (
      <Button
        onClick={e => {
          props.setIsEditorMode(true);
        }}
        variant="outlined"
        startIcon={<CreateIcon />}
        sx={{ color: '#000000' , bgcolor: '#f0f8ff'}}
      >
        EDIT
      </Button>
    )
  }

  return (
    <div>
        <Toolbar
          sx={{
          color: '#ffffff',
          bgcolor: 'primary.main',
          }}
        >
          <Grid container justifyContent="center">
            <Grid item>
              {!props.isEditorMode
                ? renderPageEditButton()
                : null
              }
            </Grid>
          </Grid>
        </Toolbar>
    </div>
  );
};

export default pageToolbar;