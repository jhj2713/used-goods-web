import { useState, useEffect } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../modules/user";
import { loadWriteList } from "../modules/community";
import { loadWriteGoods } from "../modules/goods";
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
  const { pathname } = useLocation();

  const { user, communityBoards, usedGoodsBoards } = useSelector(
    ({ user, community, goods }) => ({
      user: user.user,
      communityBoards: community.boards,
      usedGoodsBoards: goods.goodsBoards,
    }),
  );

  useEffect(() => {
    dispatch(loadWriteList({ user: user.displayName }));
    dispatch(loadWriteGoods({ user: user.displayName }));
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
              <StyledUser
                onClick={() => {
                  navigate("/mypage");
                }}
              >
                {user.displayName}
              </StyledUser>
              <StyledButton variant="link" onClick={_handleLogout}>
                ๋ก๊ทธ์์
              </StyledButton>
            </CardBox>
            <Row>
              <StyledCol>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/mypage/usedBoards");
                  }}
                >
                  <p>์ค๊ณ?๊ฑฐ๋ ๊ธ</p>
                  <p>{usedGoodsBoards && usedGoodsBoards.length}</p>
                </div>
              </StyledCol>
              <StyledCol>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/mypage/communityBoards");
                  }}
                >
                  <p>์ปค๋ฎค๋ํฐ ๊ธ</p>
                  <p>{communityBoards && communityBoards.length}</p>
                </div>
              </StyledCol>
            </Row>
          </Card>
        </Col>
        <Col md={{ span: 8 }}>
          <Card>
            <Card.Body>
              {pathname.includes("Boards") ? (
                <UserBoardList
                  boards={
                    pathname.includes("used")
                      ? usedGoodsBoards
                      : communityBoards
                  }
                />
              ) : (
                <UserUpdate user={user} />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Mypage;
