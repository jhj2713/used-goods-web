import { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 95%;
  padding-left: 5%;
  padding-top: 30px;
  margin-bottom: 20px;
`;
const StyledTitle = styled.p`
  margin-top: 10px;
  margin-left: 10px;
  font-size: 20px;
  cursor: pointer;
`;
const StyledUser = styled.p`
  margin-top: 10px;
  margin-right: 10px;
  font-size: 17px;
`;

function UserBoardList({ boards }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [listItem, setListItem] = useState([]);

  useEffect(() => {
    setListItem(boards);
  }, [boards]);

  return (
    <Container>
      <ListGroup variant="flush">
        {listItem &&
          listItem.map((item) => (
            <ListGroup.Item key={item.id}>
              <StyledTitle
                style={{ float: "left" }}
                onClick={() => {
                  pathname.includes("used")
                    ? navigate("/goodsDetail/" + item.id)
                    : navigate("/boardDetail/" + item.id);
                }}
              >
                {item.title}
              </StyledTitle>
              <StyledUser style={{ float: "right" }}>{item.user}</StyledUser>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </Container>
  );
}

export default UserBoardList;
