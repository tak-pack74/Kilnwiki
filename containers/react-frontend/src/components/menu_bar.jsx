import React from "react";
import { Toolbar, Typography, IconButton } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import MenuIcon from '@mui/icons-material/Menu';

const menuBar = props => {
  return (
    <div>
      <Toolbar
        sx={{
          bgcolor: '#b55233',
          color: '#ffffff'
        }}
      > 
          {/* TODO： その他管理ボタン 未使用 */}
          <MenuIcon sx={{ mr: 2 }}/>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            KilnWiki Pages
          </Typography>
          
          {/* 新規ページ編集ボタン ペンシルアイコン */}
          <IconButton
            sx={{color: '#242424', bgcolor: '#97b533', border: 1}}
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