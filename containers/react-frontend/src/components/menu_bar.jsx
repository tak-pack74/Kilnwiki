import React from "react";
import { Toolbar, Typography, IconButton } from '@mui/material';
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
        {/* TODO： その他管理ボタン 未使用 */}
        <MenuIcon sx={{ mr: 2 }}/>
        
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          KilnWiki Pages
        </Typography>
        
        {/* 新規ページ編集ボタン ペンシルアイコン */}
        <IconButton sx={{color: '#ffffff'}}>
          <CreateIcon 
            onClick={() => {
              props.setChosenPage({})
              props.setIsEditorMode(true);
            }}
          />
        </IconButton>
        
      </Toolbar>
    </div>
  );
};

export default menuBar;