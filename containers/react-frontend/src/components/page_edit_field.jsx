import React, { useState, useEffect, useCallback } from "react";
import { TextField, Button, Grid } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import LabelSharpIcon from '@mui/icons-material/LabelSharp';

import MDEditor from '@uiw/react-md-editor';

import APIService from '../components/APIService'
import TagSelector from './tag_selector'


const PageEditField = props => {
  const [page_id, setPageId] = useState();
  const [page_title, setPageTitle] = useState();
  const [page_body, setPageBody] = useState();
  const [selected_tags, setSelectedTags] = useState([]);

  const [isTagSelectorOpened, setIsTagSelectorOpened] = useState(false);

  const handleTagSelectorOpen = () => setIsTagSelectorOpened(true)

  // TODO: pageViewの時点でfetchしてきているので、わざわざ再取得するのは如何か
  useEffect(() => {
    if (props.chosenPage.id) {
      fetch(`http://localhost:5000/fetch_page/${props.chosenPage.id}`, {
        method: 'GET',
        headers : {
          'Content-Type':'application/json'
        }
      })
      .then(response => response.json())
      .then(response => {
        setPageId(response.page.id)
        setPageTitle(response.page.title)
        setPageBody(response.page.body)
        setSelectedTags(response.tags)
        })
      .catch(error => console.log(error))
      }
  }, [props.chosenPage.id])

  const handlePageBodyChange = useCallback(value => {
    setPageBody(value)
  }, []);

  const handleSubmit = () => {
    if (page_id) {
      // idがpropsとして渡された＝既存ページの編集時
      APIService.updatePage(page_id, {page_title,page_body,selected_tags});
      props.setIsEditorMode(false);
    } else {
      // 新規作成時
      console.log({page_title, page_body, selected_tags})
      APIService.insertPage({page_title, page_body, selected_tags});
      props.setIsEditorMode(false);
    }
  };

  return (
      <div>
        <Grid container>
          <Grid xs={9}>
            <TextField
              required
              label="Title"
              variant="outlined"
              value={page_title ? page_title : ''}  // 三項演算子を利用しないと、labelとvalueがオーバラップする。
              onChange={e => setPageTitle(e.target.value)}
              sx={{
                  bgcolor: '#ffffff',
                  borderRadius: 1,
                  width: '100%'
              }}
            />
          </Grid>

          <Grid xs={1}>
            <Button
              variant="contained"
              color="success"
              startIcon={<LabelSharpIcon />}
              onClick={handleTagSelectorOpen}
              sx={{
                borderRadius: 1,
                display: 'flex',
                width: '90%',
                left: '5%',
                height: '90%',
                top: '2%',
                color: 'white',
                bgcolor: 'black'
              }}
            >
              Tag
            </Button>
            <TagSelector
              selectedTags={selected_tags}
              isTagSelectorOpened={isTagSelectorOpened}
              setIsTagSelectorOpened={setIsTagSelectorOpened}
              setSelectedTags={setSelectedTags}
            />
          </Grid>
          <Grid xs={2}>
            <Button
              variant="contained"
              color="success"
              startIcon={<SaveIcon />}
              onClick= {handleSubmit}
              sx={{
                borderRadius: 1,
                display: 'flex',
                width: '90%',
                left: '5%',
                height: '90%',
                top: '2%',
                color: 'white',
                bgcolor: 'black'
              }}
            >
              {page_id
                ? 'Update' // 編集
                : 'Post' // 新規投稿
              }
            </Button>
          </Grid>
        </Grid>
          <MDEditor
            value={page_body}
            onChange={handlePageBodyChange}
            height={800}
          />
      </div>
  );
};

export default PageEditField