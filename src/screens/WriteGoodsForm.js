import { useState, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "@looop/quill-image-resize-module-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, FormControl } from "react-bootstrap";
import styled from "styled-components";
import "react-quill/dist/quill.snow.css";
import { saveGoods, updateGoods, loadGoods } from "../modules/goods";

Quill.register("modules/ImageResize", ImageResize);
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
  ImageResize: {
    modules: ["Resize"],
  },
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

function WriteGoodsForm() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { username, boards } = useSelector(({ user, goods }) => ({
    username: user.user.displayName,
    boards: goods.goodsBoards,
  }));

  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const _handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const _handleChange = (value) => {
    setValue(value);
  };
  const _handleSubmit = () => {
    if (pathname.includes("update")) {
      const board = {
        title: title,
        content: value,
        userId: username,
        date: date,
        id: Number(pathname.split("/")[2]),
      };
      dispatch(updateGoods(board)).then(() => {
        dispatch(loadGoods({ searchValue: "" })).then(() => {
          navigate("/goodsDetail/" + board.id);
        });
      });
    } else {
      const board = {
        title: title,
        content: value,
        userId: username,
        date: new Date(),
        id: Date.parse(new Date()),
      };
      dispatch(saveGoods(board)).then(() => {
        dispatch(loadGoods({ searchValue: "" })).then(() => {
          navigate("/usedGoods", { replace: true });
        });
      });
    }
  };

  useEffect(() => {
    if (pathname.includes("update")) {
      const boardId = Number(pathname.split("/")[2]);
      const board = boards.find((item) => {
        return item.id === boardId;
      });
      setTitle(board.title);
      setValue(board.content);
      setDate(board.date);
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
          ????????????
        </Button>
        <Button variant="outline-secondary" onClick={_handleSubmit}>
          ????????????
        </Button>
      </ButtonBox>
    </Container>
  );
}

export default WriteGoodsForm;
