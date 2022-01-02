import React, { useState, useEffect, useCallback } from "react";
import { TextField, Button, Grid } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import LabelSharpIcon from '@mui/icons-material/LabelSharp';

import MDEditor from '@uiw/react-md-editor';

import APIService from '../components/APIService'
import TagSelector from './tag_selector'


const PageEditField = props => {
  // フォームに入力されたページの内容。
  // ※page_idだけはfetchPageされてきてから更新されることはない
  const [page_id, setPageId] = useState();
  const [page_title, setPageTitle] = useState();
  const [page_body, setPageBody] = useState();
  
  // 選択されたタグの id の 配列。命名が悪いが、あくまで id の配列が入る
  const [selected_tags, setSelectedTags] = useState([]);

  const [isTagSelectorOpened, setIsTagSelectorOpened] = useState(false);

  const handleTagSelectorOpen = () => setIsTagSelectorOpened(true)

  // 選択ページのidからページレコードを取得する。(全カラムのデータを取得)
  useEffect(() => {
    if (props.chosenPage.id) {
      APIService.fetchPage(props.chosenPage.id)
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
      APIService.updatePage(page_id, {page_title,page_body,selected_tags})
      .then(response => {
        props.setChosenPage(response.page)
      });
      props.setIsEditorMode(false);
    } else {
      // idがpropとして渡されていない=新規作成時
      APIService.insertPage({page_title, page_body, selected_tags})
      .then(response => {
        props.setChosenPage(response.page)
      });
      props.setIsEditorMode(false);
    };
    props.setOnPagePost(!props.onPagePost);
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
                ? 'Update' // 編集時
                : 'Post'   // 新規投稿時
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