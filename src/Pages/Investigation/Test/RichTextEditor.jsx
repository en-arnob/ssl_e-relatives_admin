import React from "react";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// const config = {
//   buttons: ["bold", "italic", "link", "unlink", "underline", "source", 'insertImage],
// };
const config = {
  toolbar: [
    "heading",
    "|",
    "bold",
    "italic",
    "bulletedList",
    "numberedList",
    "blockQuote",
    "undo",
    "redo",
  ],
};

const RichTextEditor = ({ data, setData, changeTextEditorValue, index }) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={data.info}
      // data={"abc"}
      /* onChange={(e, editor) => {
        // setData({ ...data, info: editor.getData() })
        const onchangeVal = [...data];
        // console.log(onchangeVal);
        onchangeVal[index].info = editor.getData();
        setData(onchangeVal);
        console.log(editor.getData())
      }} */
      onChange={(_, editor) => changeTextEditorValue(editor, data.id)}
      config={config}
    />
  );
};

export default RichTextEditor;
