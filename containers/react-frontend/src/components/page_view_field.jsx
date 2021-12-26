import React, { useState, useEffect } from "react";
import { Box } from '@mui/material';

import MDEditor from '@uiw/react-md-editor';

import APIService from './APIService'

const PageViewField = props => {
  const [page, setPage] = useState({
    id:null,
    title: null,
    body: null,
  });

  useEffect(() => {
    if (props.chosenPage.id) {
      APIService.fetchPage(props.chosenPage.id)
      .then(response => response.json())
      .then(response => {
        setPage(response.page);
      })
      .catch(error => console.log(error))
    }
  }, [props.chosenPage.id])

  return (
    <div>
      <Box sx={{ width: '95%', margin: 'auto'}}>
        <MDEditor.Markdown 
          source={page.body} 
          height='100%'
          previewOptions={{
            disallowedElements: ["h1"]
          }}
        />  
      </Box>
    </div>
  );
};

export default PageViewField;