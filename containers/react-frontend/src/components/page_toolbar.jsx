import React, { useState } from "react";
import { Toolbar, Menu, MenuItem, Button, Grid, IconButton, ListItemIcon } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import DeleteIcon from '@mui/icons-material/Delete';

import APIService from "./APIService";
const PageToolbar = props => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl)
  
  const handleClick = event => {
    setAnchorEl(event.currentTarget); // eventの内容は重要ではない。値を入れてtrueにしているだけ
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    APIService.deletePage(props.chosenPage.id)
    .then(() => props.setOnPagePost(!props.onPagePost));
    props.setChosenPage({id:null,title: null});
    props.setIsEditorMode(false);
    console.log("handler実行");
  };


  const renderPageEditButton = () => {
    return (
      <Button
        onClick={e => {
          props.setIsEditorMode(true);
        }}
        variant="outlined"
        startIcon={<CreateIcon />}
        sx={{ color: 'black' , bgcolor: 'white', border: '1px solid black'}}
      >
        EDIT
      </Button>
    )
  }
  const renderPageControlMenuButton = () => {
    return (
      <div>
        <IconButton
          size="medium"
          sx={{ color: 'black', ml: 3 }}
          onClick={handleClick}
        >
          <MoreHorizRoundedIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
        >
          <MenuItem
            onClick={handleDelete}
          >
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            DELETE
          </MenuItem>
        </Menu>
      </div>
    )
  }

  return (
    <div>
      <Toolbar
        sx={{
        color: '#000000',
        bgcolor: '#ffffff',
        }}
      >
        <Grid container justifyContent='flex-end'>
          <Grid item>
            {// 編集画面が非表示または、新規ページの編集時は非表示
            !props.isEditorMode && props.chosenPage.id
              ? renderPageEditButton()
              : null
            }
          </Grid>
          <Grid item
            sx={{ float: "right"}}
          >
            {props.chosenPage.id
              ? renderPageControlMenuButton()
              : null
            }
          </Grid>
        </Grid>
      </Toolbar>
    </div>
  );
};

export default PageToolbar;