import React from "react";
import { Toolbar, Button } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';

const pageToolbar = props => {
  const renderPageEditButton = () => {
    return (
      <Button
        onClick={e => {
          props.setIsEditorMode(true);
        }}
        color="success"
        variant="outlined"
        startIcon={<CreateIcon />}
        sx={{ color: '#ffffff' , bgcolor: '#43676b'}}>
        EDIT
      </Button>
    )
  }

  return (
    <div className>
        <Toolbar
          sx={{
          color: '#ffffff',
          bgcolor: 'primary.main',
          }}
        >
          {!props.isEditorMode
            ? renderPageEditButton()
            : null
          }
        </Toolbar>
    </div>
  );
};

export default pageToolbar;