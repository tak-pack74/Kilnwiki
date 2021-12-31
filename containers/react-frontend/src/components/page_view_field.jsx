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
      .then(response => {
        setPage(response.page);
      })
      .catch(error => console.log(error))
    } else if(props.chosenPage.id === null){
      setPage({id:null,title: null,body: null,});
    }
  }, [props.chosenPage])

  return (
    <div>
      <Box sx={{ width: '95%', margin: 'auto' }}>
        <MDEditor.Markdown 
          source={page.body}
          style={{
            height:'880px',
            witdh: '100%',
            maxHeight:'850px',
            overflow:"scroll",
            paddingRight: 10
          }}
          previewOptions={{
            disallowedElements: ["h1"]
          }}
        />  
      </Box>
    </div>
  );
};

export default PageViewField;