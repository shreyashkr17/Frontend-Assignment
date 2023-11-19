import React, { useState } from 'react'
import { JsonEditor as Editor } from 'jsoneditor-react'
import 'jsoneditor-react/es/editor.min.css'
import Ajv from 'ajv'

const ajv = new Ajv({allErrors: true, verbose: true})

function LeftPanel({schema,setSchema}) {
    const editorStyle = {
        height:'100%'
    }
  return (
    <Editor
        value={schema}
        onChange={setSchema}
        ajv={ajv}
        theme="light"
        allowedModes={['text']}
        mode="text"
        // style={editorStyle}
    />
  )
}

export default LeftPanel
