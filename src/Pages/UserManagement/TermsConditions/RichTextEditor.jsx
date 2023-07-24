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

const RichTextEditor = ({ data, setData, editorData }) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={editorData}
      onChange={(e, editor) => setData(editor.getData())}
      config={config}
    />
  );
};

export default RichTextEditor;
