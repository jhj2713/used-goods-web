import { useState, useEffect } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../modules/user";
import UserUpdate from "../components/UserUpdate";
import UserBoardList from "../components/UserBoardList";
import styled from "styled-components";

const Container = styled.div`
  margin: 100px;
`;
const StyledUser = styled.p`
  font-size: 20px;
  cursor: pointer;
`;
const CardBox = styled.div`
  margin: 20px;
  text-align: center;
`;
const StyledCol = styled(Col)`
  display: flex;
  justify-content: center;
  text-align: center;
`;
const StyledButton = styled(Button)`
  text-decoration: none;
  color: lightgray;
  :hover {
    color: gray;
  }
`;

function Mypage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));

  const [typeNumber, setTypeNumber] = useState(1);
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    setBoards([
      { id: 1, title: "제목", user: "유저명" },
      { id: 2, title: "제목", user: "유저명" },
      { id: 3, title: "제목", user: "유저명" },
      { id: 4, title: "제목", user: "유저명" },
      { id: 5, title: "제목", user: "유저명" },
      { id: 6, title: "제목", user: "유저명" },
      { id: 7, title: "제목", user: "유저명" },
      { id: 8, title: "제목", user: "유저명" },
    ]);
  }, []);

  const _handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Container>
      <Row xs={1} md={2} className="g-4">
        <Col md={{ span: 4 }}>
          <Card>
            <CardBox>
              <StyledUser onClick={() => setTypeNumber(1)}>
                {user.displayName}
              </StyledUser>
              <StyledButton variant="link" onClick={_handleLogout}>
                로그아웃
              </StyledButton>
            </CardBox>
            <Row>
              <StyledCol>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => setTypeNumber(2)}
                >
                  <p>작성한 글</p>
                  <p>0</p>
                </div>
              </StyledCol>
              <StyledCol>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => setTypeNumber(3)}
                >
                  <p>좋아한 글</p>
                  <p>0</p>
                </div>
              </StyledCol>
            </Row>
          </Card>
        </Col>
        <Col md={{ span: 8 }}>
          <Card>
            <Card.Body>
              {typeNumber === 1 ? (
                <UserUpdate />
              ) : (
                <UserBoardList boards={boards} />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Mypage;
