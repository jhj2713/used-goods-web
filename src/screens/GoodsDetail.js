import { useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import Comments from "../components/Comments";
import { deleteGoods, loadGoods } from "../modules/goods";
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

function GoodsDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { boards } = useSelector(({ goods }) => ({
    boards: goods.goodsBoards,
  }));

  const boardId = Number(pathname.split("/")[2]);
  const [board, setBoard] = useState({ title: "", content: "", userId: "" });
  const [comments, setComments] = useState([
    { id: 1, content: "댓글댓글", user: "유저명" },
    { id: 2, content: "댓글댓글", user: "유저명" },
    { id: 3, content: "댓글댓글", user: "유저명" },
    { id: 4, content: "댓글댓글", user: "유저명" },
    { id: 5, content: "댓글댓글", user: "유저명" },
    { id: 6, content: "댓글댓글", user: "유저명" },
  ]);

  const _handleUpdate = () => {
    navigate("/updateGoodsBoard/" + boardId);
  };
  const _handleDelete = () => {
    dispatch(deleteGoods(board)).then(() => {
      dispatch(loadGoods()).then(() => {
        navigate("/usedGoods");
      });
    });
  };

  useEffect(() => {
    setBoard(
      boards.find((item) => {
        return item.id === boardId;
      }),
    );
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
        <ButtonBox>
          <Button variant="outline-secondary" size="sm" onClick={_handleUpdate}>
            수정하기
          </Button>
          <Button variant="outline-danger" size="sm" onClick={_handleDelete}>
            삭제하기
          </Button>
        </ButtonBox>
      </StyledBoard>
      <Comments comments={comments} />
    </Container>
  );
}

export default GoodsDetail;
