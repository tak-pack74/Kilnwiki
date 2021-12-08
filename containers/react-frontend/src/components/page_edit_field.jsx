import React, { useState, useEffect, useCallback } from "react";
import { TextField, Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

import MDEditor from '@uiw/react-md-editor';
import APIService from '../components/APIService'

const PageEditField = props => {
    const [title, setTitle] = useState("");
    const [page_body, setPageBody] = useState("Initial Value");

    const handlePageBodyChange = useCallback((value) => {
        setPageBody(value);
      }, []);

    const handleSubmit = () => {
        APIService.newPage({title,page_body});
        props.setIsEditorMode(false)
    };

    return (
        <div>
            <TextField
              required
              label="タイトル"
              variant="outlined"
              value={title}
              onChange={e => setTitle(e.target.value)}
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