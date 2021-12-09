import React from "react";
import { Toolbar, Typography, Box } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import MenuIcon from '@mui/icons-material/Menu';

const menuBar = props => {
  return (
    <div>
      <Toolbar
        sx={{
          bgcolor: 'primary.main',
          color: '#ffffff'
        }}
      >
        <MenuIcon sx={{ mr: 2 }}/>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          KilnWiki Pages
        </Typography>
        <CreateIcon 
          onClick={() => {
            props.setChosenPage({})
            props.setIsEditorMode(true);
          }}
        />
      </Toolbar>
    </div>
  );
};

export default menuBar;