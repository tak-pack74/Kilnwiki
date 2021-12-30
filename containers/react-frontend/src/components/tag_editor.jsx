import React, { useState, useEffect } from "react";
import { TableContainer, Table, TableHead, TableBody, TableRow,
         TableCell, TextField, IconButton, Divider, Modal,
         Box, InputAdornment, Grid } from '@mui/material';
import LabelSharpIcon from '@mui/icons-material/LabelSharp';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

import APIService from './APIService'

const TagEditor = props => {
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

  const handleTagDelete = tag_id => {
    APIService.deleteTag(tag_id)
    setIsLoading(true);
  };

  useEffect(() => {
    APIService.fetchAllTags()
    .then(response => response.json())
    .then(response => setTags(response))
    .catch(error => console.log(error))
    setIsLoading(false)
  },[isLoading])

  const renderTagTable = () => {
    const column_id_width = '5%';
    const column_name_width = '25%';
    const column_description_width = '70%';

    return (
      <TableContainer sx={{height: '80%'}}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: column_id_width }} align="center">Id</TableCell>
              <TableCell style={{ width: column_name_width }} align="left">Name</TableCell>
              <TableCell style={{ width: column_description_width }} align="left">Description</TableCell>
              <TableCell></TableCell> {/* 削除・編集ボタン用の領域*/}
            </TableRow>
          </TableHead>
          <TableBody>
            {tags.map(tag => (
              <TableRow>
                <TableCell style={{ width: column_id_width }} align="center" component="th" scope="row">{tag.id}</TableCell>
                <TableCell style={{ width: column_name_width }} align="left">{tag.name}</TableCell>
                <TableCell style={{ width: column_description_width }} align="left">{tag.description}</TableCell>
                <TableCell>
                  <IconButton 
                    onClick={() => handleTagDelete(tag.id)}
                    size='medium' sx={{ ml: 4, bgcolor: '#eeeeee'}}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
      <Modal open={props.isTagEditorOpened} onClose={handleTagEditorClose} >
        <Box sx={tagEditorStyle}>
          <Grid container>
            <Grid item xs={12}>
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
            <Grid item xs={10}>
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
                )
                }}
                sx={{ width: '80%'}}
              />
            </Grid>
            <Grid item xs={2}>
              <IconButton 
                onClick={handleTagSubmit}  
                size='medium' sx={{ ml: 4, bgcolor: '#eeeeee'}}
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Divider sx={{ pt: 1 }}/>
            {/* タグ一覧テーブル */}
            {renderTagTable()}
        </Box>
      </Modal>
    </div>
  );
};

export default TagEditor