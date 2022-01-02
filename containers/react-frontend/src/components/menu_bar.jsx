import React from "react";
import { Toolbar, Typography, IconButton } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';

const menuBar = props => {
  return (
    <div>
      <Toolbar
        sx={{
          color: '#000000',
          bgcolor: '#ffffff',
        }}
      >       
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            KilnWiki Pages
          </Typography>
          
          {/* 新規ページ編集ボタン ペンシルアイコン */}
          <IconButton
            sx={{color: '#242424', bgcolor: '#ffffff', border: 1}}
            onClick={() => {
              props.setChosenPage({})
              props.setIsEditorMode(true);
            }}
          >
            <CreateIcon/>
          </IconButton>
      </Toolbar>
    </div>
  );
};

export default menuBar;