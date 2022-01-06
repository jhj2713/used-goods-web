import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteComment, loadComments } from "../modules/community";

const Container = styled.div`
  margin: 10px;
`;
const StyledComment = styled.div`
  display: flex;
  padding-top: 10px;
  justify-content: space-between;
`;
const StyledRemove = styled.p`
  cursor: pointer;
  margin-right: 10px;
  color: red;
`;
const StyledContent = styled.p``;
const StyledBox = styled.div`
  display: flex;
`;
const StyledUser = styled.p`
  cursor: pointer;
`;

function Comments({ board, comments }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));

  const _handleRemove = (item) => {
    dispatch(deleteComment({ boardId: board, id: item.id })).then(() => {
      dispatch(loadComments({ boardId: board }));
    });
  };

  return (
    <Container>
      {comments &&
        comments.map((item) => (
          <StyledComment key={item.id}>
            <StyledContent>{item.content}</StyledContent>
            <StyledBox>
              {user.displayName === item.userId && (
                <StyledRemove onClick={() => _handleRemove(item)}>
                  X
                </StyledRemove>
              )}
              <StyledUser onClick={() => navigate("/otheruser/" + item.userId)}>
                {item.userId}
              </StyledUser>
            </StyledBox>
          </StyledComment>
        ))}
    </Container>
  );
}

export default Comments;
