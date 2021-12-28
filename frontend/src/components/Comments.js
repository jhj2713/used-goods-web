import styled from "styled-components";

const Container = styled.div`
  margin: 10px;
`;
const StyledComment = styled.div`
  display: flex;
  padding-top: 10px;
  justify-content: space-between;
`;
const StyledContent = styled.p``;
const StyledUser = styled.p``;

function Comments({ comments }) {
  return (
    <Container>
      {comments.map((item) => (
        <StyledComment key={item.id}>
          <StyledContent>{item.content}</StyledContent>
          <StyledUser>{item.user}</StyledUser>
        </StyledComment>
      ))}
    </Container>
  );
}

export default Comments;
