import React, { useState, useEffect, useCallback } from "react";
import { TextField, Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

import MDEditor from '@uiw/react-md-editor';
import APIService from '../components/APIService'

const PageEditField = props => {
  const [page_id, setPageId] = useState();
  const [page_title, setPageTitle] = useState();
  const [page_body, setPageBody] = useState();

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
        setPageId(response.id)
        setPageTitle(response.title)
        setPageBody(response.body)
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
      APIService.updatePage(page_id, {page_title,page_body});
      props.setIsEditorMode(false);
    } else {
      // 新規作成時
      APIService.insertPage({page_title,page_body});
      props.setIsEditorMode(false);
    }
  };

  return (
      <div>
          <TextField
            required
            label="Title"
            variant="outlined"
            value={page_title ? page_title : ''}  // 三項演算子を利用しない場合、labelとvalueがオーバラップする
            onChange={e => setPageTitle(e.target.value)}
            sx={{
                bgcolor: '#ffffff',
                borderRadius: 1,
                width: '80%',
            }}
          />

          <Button
            variant="contained"
            color="success"
            startIcon={<SaveIcon />}
            onClick= {handleSubmit}
            sx={{
              borderRadius: 1,
              width: '20%',
          }}
          >
          SAVE
          </Button>
          <MDEditor
            value={page_body}
            onChange={handlePageBodyChange}
            height={800}
          />
      </div>
  );
};

export default PageEditField