import React from "react";
import { Toolbar, TextField } from '@mui/material';

const pageControllToolbar = () => {
  return (
    <div className>
        <Toolbar
          sx={{
            color:'#ffffff',
            bgcolor: 'primary.main',
          }}
        >
          <TextField
            required
            label="Page Title"
            variant="standard"
            sx={{
              bgcolor: '#ffffff',
              borderRadius: 1,
            }}
          />
        </Toolbar>
    </div>
  );
};

export default pageControllToolbar;