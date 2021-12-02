import React, { useState, useEffect } from "react";

import TextField from '@mui/material/TextField';

import SimpleMdeReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const PageEditField = props => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const toolbar = [
        {
            name: "save",
            action: function customFunction(editor) {
                alert(editor.value())
                // save action
            },
            className: "fa fa-star",
            title: "Save"
        },
        '|',
        'bold',
        'italic',
        'heading',
        '|',
        'quote',
        'unordered-list',
        'ordered-list',
        '|',
        'link',
        '|',
        'preview',
        'side-by-side',
        'fullscreen',
        '|',
        'guide',
    ]

    return (
        <div>
            <SimpleMdeReact  options={{toolbar:toolbar}} value={body} onChange={body => setBody(body)}/>
        </div>
    )
}

export default PageEditField