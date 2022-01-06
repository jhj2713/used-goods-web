import { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import Comments from "../components/Comments";
import {
  deleteGoods,
  loadGoods,
  saveComment,
  loadComments,
} from "../modules/goods";
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

function GoodsDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { boards, user, comments } = useSelector(({ goods, user }) => ({
    boards: goods.goodsBoards,
    user: user.user,
    comments: goods.comments,
  }));

  const boardId = Number(pathname.split("/")[2]);
  const [board, setBoard] = useState({});
  const [commentValue, setCommentValue] = useState("");

  const _handleUpdate = () => {
    navigate("/updateGoodsBoard/" + boardId);
  };
  const _handleDelete = () => {
    dispatch(deleteGoods(board)).then(() => {
      dispatch(loadGoods({ searchValue: "" })).then(() => {
        navigate("/usedGoods");
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

  return (
    <Container>
      <StyledBoard>
        <TitleBox>
          <StyledTitle>{board.title}</StyledTitle>
          <StyledUser onClick={() => navigate("/otheruser/" + board.userId)}>
            {board.userId}
          </StyledUser>
        </TitleBox>
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
              수정하기
            </Button>
            <Button variant="outline-danger" size="sm" onClick={_handleDelete}>
              삭제하기
            </Button>
          </ButtonBox>
        )}
      </StyledBoard>
      <CommentInputContainer>
        <InputGroup>
          <FormControl value={commentValue} onChange={_handleCommentChange} />
          <Button variant="outline-secondary" onClick={_handleCommentSubmit}>
            작성
          </Button>
        </InputGroup>
      </CommentInputContainer>
      <Comments comments={comments} />
    </Container>
  );
}

export default GoodsDetail;
