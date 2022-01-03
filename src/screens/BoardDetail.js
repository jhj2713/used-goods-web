import { useState } from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import Comments from "../components/Comments";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  margin: 50px;
  padding-left: 15%;
  width: 80%;
`;
const StyledBoard = styled.div`
  padding-bottom: 20px;
  border-bottom: 1px solid gray;
`;
const StyledTitle = styled.p`
  font-size: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid gray;
  font-weight: bold;
`;
const StyledContent = styled.p`
  font-size: 20px;
  margin: 10px;
`;
const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

function BoardDetail() {
  const navigate = useNavigate();
  const [comments, setComments] = useState([
    { id: 1, content: "댓글댓글", user: "유저명" },
    { id: 2, content: "댓글댓글", user: "유저명" },
    { id: 3, content: "댓글댓글", user: "유저명" },
    { id: 4, content: "댓글댓글", user: "유저명" },
    { id: 5, content: "댓글댓글", user: "유저명" },
    { id: 6, content: "댓글댓글", user: "유저명" },
  ]);

  const _handleUpdate = () => {
    navigate("/updateBoard");
  };

  return (
    <Container>
      <StyledBoard>
        <StyledTitle>제목</StyledTitle>
        <StyledContent>내용</StyledContent>
        <ButtonBox>
          <Button variant="outline-secondary" size="sm" onClick={_handleUpdate}>
            수정하기
          </Button>
          <Button variant="outline-danger" size="sm">
            삭제하기
          </Button>
        </ButtonBox>
      </StyledBoard>
      <Comments comments={comments} />
    </Container>
  );
}

export default BoardDetail;
