import { useState, useEffect } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { logout, loadUser } from "../modules/user";
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

function OtherUserpage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { otherUser, communityBoards, usedGoodsBoards } = useSelector(
    ({ user, community, goods }) => ({
      otherUser: user.otherUser,
      communityBoards: community.boards,
      usedGoodsBoards: goods.goodsBoards,
    }),
  );

  useEffect(() => {
    dispatch(loadUser({ username: pathname.split("/")[2] }));
  }, [pathname]);
  useEffect(() => {
    if (otherUser) {
      dispatch(loadWriteList({ user: otherUser.username }));
      dispatch(loadWriteGoods({ user: otherUser.username }));
    }
  }, [otherUser]);

  return (
    <Container>
      <Row xs={1} md={2} className="g-4">
        <Col md={{ span: 4 }}>
          <Card>
            <CardBox>
              <StyledUser
                onClick={() => {
                  navigate("/otheruser/" + otherUser.username);
                }}
              >
                {otherUser && otherUser.username}
              </StyledUser>
            </CardBox>
            <Row>
              <StyledCol>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate(
                      "/otheruser/" + otherUser.username + "/usedBoards",
                    );
                  }}
                >
                  <p>중고거래 글</p>
                  <p>{usedGoodsBoards && usedGoodsBoards.length}</p>
                </div>
              </StyledCol>
              <StyledCol>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate(
                      "/otheruser/" + otherUser.username + "/communityBoards",
                    );
                  }}
                >
                  <p>커뮤니티 글</p>
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
                <UserUpdate
                  user={{
                    email: otherUser.email,
                    displayName: otherUser.username,
                  }}
                />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default OtherUserpage;
