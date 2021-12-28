import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, FormControl } from "react-bootstrap";
import styled from "styled-components";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    //[{ 'font': [] }],
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
    ["clean"],
  ],
};
const formats = [
  //'font',
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "align",
  "color",
  "background",
];

const Container = styled.div`
  margin: 30px;
`;
const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

function WriteForm() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");

  const _handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const _handleChange = (value) => {
    setValue(value);
  };

  useEffect(() => {
    if (pathname.includes("update")) {
      setTitle("제목");
      setValue("내용");
    }
  }, []);

  return (
    <Container>
      <FormControl
        placeholder="Enter Title"
        value={title}
        onChange={_handleTitle}
        size="lg"
      />{" "}
      <br />
      <div style={{ height: 550 }}>
        <ReactQuill
          style={{ height: 500 }}
          theme="snow"
          modules={modules}
          formats={formats}
          value={value || ""}
          onChange={(content, delta, source, editor) =>
            _handleChange(editor.getHTML())
          }
        />
      </div>
      <ButtonBox>
        <Button
          variant="outline-danger"
          style={{ marginRight: 5 }}
          onClick={() => navigate(-1)}
        >
          취소하기
        </Button>
        <Button variant="outline-secondary">작성하기</Button>
      </ButtonBox>
    </Container>
  );
}

export default WriteForm;
