import React, { useEffect, useRef } from "react";
function Editor({ onChange, editorLoaded, name, data, disabled }) {
  const editorRef = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic")
    };

  }, []);

  return (
    <div>
      {editorLoaded && editorRef.current?.CKEditor ? (
        <CKEditor

          disabled={disabled}
          type=""
          data={data}
          name={name}
          editor={ClassicEditor}
          onChange={(event, editor) => {
            const data = editor.getData();
            // console.log({ event, editor, data })
            onChange(data);
          }}
        />
      ) : (
        <div>Editor loading</div>
      )}
    </div>
  );
}

export default Editor;