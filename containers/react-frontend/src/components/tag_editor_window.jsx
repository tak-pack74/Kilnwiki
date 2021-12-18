import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemText, TextField, IconButton, Divider, Modal, Box, InputAdornment, Grid } from '@mui/material';
import LabelSharpIcon from '@mui/icons-material/LabelSharp';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import APIService from '../components/APIService'

const TagEditorWindow = props => {
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // タグ投稿フォームの入力値を受け取る state
  const [tag_name, setTagName] = useState(false);
  const [tag_description, setTagDescription] = useState(false);

  const handleTagEditorClose = () => props.setIsTagEditorOpened(false)

  const handleTagSubmit = () => {
    APIService.insertTag({tag_name, tag_description});
    setTagName(null);
    setTagDescription(null);
    setIsLoading(true);
  }

  useEffect(() => {
    fetch('http://localhost:5000/fetch_all_tags',{
      method: 'GET',
      headers : {
        'Content-Type':'application/json'
      }
    })
    .then(response => response.json())
    .then(response => setTags(response))
    .catch(error => console.log(error))
    setIsLoading(false)
  },[isLoading])

  const renderTagListItem = () => {
    return (
      <div>
        {tags.map(
          tag => (
            <ListItem sx={{ borderBottom: 1, borderColor: 'grey.300' }}>
              <ListItemText primary={tag.name}/>
              {tag.description}
            </ListItem>
          )
        )}
      </div>
    )
  };

  const tagEditorStyle = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '60%',
    width: '60%',
    minheight: 300,
    minwidth: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    borderRadius: 4,
    p: 4,
  };

  return (
    <div>
      <Modal open={props.istagEditorOpened} onClose={handleTagEditorClose} >
        <Box sx={tagEditorStyle}>
          <Grid container >
            <Grid item xs={4}>
              <TextField
                required
                label="Tag Name"
                onChange={e => setTagName(e.target.value)}
                value={tag_name ? tag_name : ''}
                InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LabelSharpIcon />
                  </InputAdornment>
                ),
                }}
                variant="standard"
              />
            </Grid>
            <Grid item xs={8}>
              <IconButton 
                onClick={handleTagSubmit}  
                size='medium' sx={{ ml: 4, bgcolor: '#eeeeee'}}
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </Grid>
            <Grid item xs>
              <TextField
                label="Tag Description"
                onChange={e => setTagDescription(e.target.value)}
                value={tag_description ? tag_description : ''}
                variant="standard"
                InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <TextSnippetIcon />
                  </InputAdornment>
                ),
                }}
                sx={{ width: '80%'}}
              />
            </Grid>
          </Grid>
          <Divider sx={{ pt: 1 }}/>
          <List
            sx={{
              maxHeight: '80%',
              position: 'relative',
              overflow: 'auto',
            }}
          >
            {renderTagListItem()}
          </List>
        </Box>
      </Modal>
    </div>
  );
};

export default TagEditorWindow