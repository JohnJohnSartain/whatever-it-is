import ReactQuill from "react-quill";
import "./quill.snow.css";

interface RichTextEditor {
  content: string;
  setContent(arg: string): void;
}

function RichTextEditor({ content, setContent }: RichTextEditor) {
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ align: ["right", "center", "justify"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      [{ color: [] }],
      [{ background: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "color",
    "image",
    "background",
    "align",
    "size",
    "font",
  ];

  return (
    <ReactQuill
      theme="snow"
      modules={modules}
      scrollingContainer="html"
      formats={formats}
      placeholder="What are you thinking..."
      value={content}
      onChange={(value) => setContent(value)}
    />
  );
}

export default RichTextEditor;
