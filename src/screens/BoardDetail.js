import { useState, useEffect } from "react";
import styled from "styled-components";
import { InputGroup, Button, FormControl } from "react-bootstrap";
import Comments from "../components/Comments";
import {
  deleteBoard,
  loadBoards,
  saveComment,
  loadComments,
} from "../modules/community";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const Container = styled.div`
  margin: 50px;
  padding-left: 15%;
  width: 80%;
`;
const StyledBoard = styled.div`
  padding-bottom: 20px;
  border-bottom: 1px solid gray;
`;
const TitleBox = styled.div`
  display: flex;
  border-bottom: 1px solid gray;
  justify-content: space-between;
`;
const StyledTitle = styled.p`
  font-size: 30px;
  padding-bottom: 20px;
  font-weight: bold;
`;
const StyledUser = styled.p`
  font-size: 15px;
  margin-top: 20px;
  cursor: pointer;
`;
const StyledContent = styled.p`
  font-size: 20px;
  margin: 10px;
`;
const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const CommentInputContainer = styled.div`
  margin: 10px 0px;
`;
const StyledDate = styled.p`
  display: flex;
  justify-content: flex-end;
  margin: 5px;
`;

function BoardDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { boards, user, comments } = useSelector(({ community, user }) => ({
    boards: community.boards,
    user: user.user,
    comments: community.comments,
  }));

  const boardId = Number(pathname.split("/")[2]);
  const [board, setBoard] = useState({});
  const [date, setDate] = useState("");
  const [commentValue, setCommentValue] = useState("");

  const _handleUpdate = () => {
    navigate("/updateBoard/" + boardId);
  };
  const _handleDelete = () => {
    dispatch(deleteBoard(board)).then(() => {
      dispatch(loadBoards({ searchValue: "" })).then(() => {
        navigate("/community");
      });
    });
  };
  const _handleCommentChange = (e) => {
    setCommentValue(e.target.value);
  };
  const _handleCommentSubmit = () => {
    const comment = {
      content: commentValue,
      userId: user.displayName,
      date: new Date(),
      id: Date.parse(new Date()),
    };
    dispatch(
      saveComment({
        board,
        comment,
      }),
    ).then(() => {
      setCommentValue("");
    });
  };

  useEffect(() => {
    if (boards) {
      setBoard(
        boards.find((item) => {
          return item.id === boardId;
        }),
      );
    }
    dispatch(loadComments({ boardId }));
  }, []);
  useEffect(() => {
    if (board.date) {
      const date = new Date(board.date.seconds * 1000);
      const dateFormat =
        date.getFullYear() +
        "/" +
        date.getMonth() +
        1 +
        "/" +
        date.getDate().toString().padStart(2, "0");
      setDate(dateFormat);
    }
  }, [board]);

  return (
    <Container>
      <StyledBoard>
        <TitleBox>
          <StyledTitle>{board.title}</StyledTitle>
          <StyledUser onClick={() => navigate("/otheruser/" + board.userId)}>
            {board.userId}
          </StyledUser>
        </TitleBox>
        <StyledDate>{date}</StyledDate>
        <StyledContent
          dangerouslySetInnerHTML={{ __html: board.content }}
        ></StyledContent>
        {board.userId === user.displayName && (
          <ButtonBox>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={_handleUpdate}
            >
              ????????????
            </Button>
            <Button variant="outline-danger" size="sm" onClick={_handleDelete}>
              ????????????
            </Button>
          </ButtonBox>
        )}
      </StyledBoard>
      <CommentInputContainer>
        <InputGroup>
          <FormControl value={commentValue} onChange={_handleCommentChange} />
          <Button variant="outline-secondary" onClick={_handleCommentSubmit}>
            ??????
          </Button>
        </InputGroup>
      </CommentInputContainer>
      <Comments board={board.id} comments={comments} />
    </Container>
  );
}

export default BoardDetail;
