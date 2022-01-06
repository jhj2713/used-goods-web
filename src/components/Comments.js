import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  margin: 10px;
`;
const StyledComment = styled.div`
  display: flex;
  padding-top: 10px;
  justify-content: space-between;
`;
const StyledContent = styled.p``;
const StyledUser = styled.p`
  cursor: pointer;
`;

function Comments({ comments }) {
  const navigate = useNavigate();

  return (
    <Container>
      {comments &&
        comments.map((item) => (
          <StyledComment key={item.id}>
            <StyledContent>{item.content}</StyledContent>
            <StyledUser onClick={() => navigate("/otheruser/" + item.userId)}>
              {item.userId}
            </StyledUser>
          </StyledComment>
        ))}
    </Container>
  );
}

export default Comments;
