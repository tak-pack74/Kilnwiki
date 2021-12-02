import React from "react";
import { Toolbar } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import MenuIcon from '@mui/icons-material/Menu';

const managementToolbar = props => {
  return (
    <div>
        <Toolbar
         sx={{
           bgcolor: 'primary.main',
         }}
         >
          <MenuIcon />
          <CreateIcon 
           onClick={() => props.handleNewPageClick(true)}
          />
        </Toolbar>
    </div>
  );
};

export default managementToolbar;