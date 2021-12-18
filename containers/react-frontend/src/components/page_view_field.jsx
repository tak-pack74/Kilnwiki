import React, { useState, useEffect } from "react";
import { Box } from '@mui/material';

import MDEditor from '@uiw/react-md-editor';



const PageViewField = props => {
  const [page, setPage] = useState({
    id:null,
    title: null,
    body: null,
  });

  useEffect(() => {
    if (props.chosenPage.id) {
      fetch(`http://localhost:5000/fetch_page/${props.chosenPage.id}`, {
        method: 'GET',
        headers : {
          'Content-Type':'application/json'
        }
      })
      .then(response => response.json())
      .then(response => setPage(response))
      .catch(error => console.log(error))
    }
  }, [props.chosenPage.id])

  return (
    <div>
      <Box sx={{ width: '95%', margin: 'auto'}}>
        <MDEditor.Markdown 
          source={page.body} 
          previewOptions={{
            disallowedElements: ["h1"]
          }}
        />  
      </Box>
    </div>
  );
};

export default PageViewField;