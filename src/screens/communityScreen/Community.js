import { useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";
import Search from "../../components/Search";
import styled from "styled-components";

const Container = styled.div`
  width: 90%;
  padding-left: 10%;
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
const PageContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const SearchBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 10px;
`;
const ButtonBox = styled.div`
  margin-top: 20px;
  margin-left: 10px;
`;

function Community() {
  const navigate = useNavigate();
  const [listItem, setListItem] = useState([
    { id: 1, title: "제목", user: "유저명" },
    { id: 2, title: "제목", user: "유저명" },
    { id: 3, title: "제목", user: "유저명" },
    { id: 4, title: "제목", user: "유저명" },
    { id: 5, title: "제목", user: "유저명" },
    { id: 6, title: "제목", user: "유저명" },
    { id: 7, title: "제목", user: "유저명" },
    { id: 8, title: "제목", user: "유저명" },
  ]);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  const _handlePrev = () => {
    setPage((page) => page - 1);
  };
  const _handleNext = () => {
    setPage((page) => page + 1);
  };
  const _handleSearch = () => {
    console.log(searchValue);
  };

  return (
    <Container>
      <SearchBox>
        <Search
          value={searchValue}
          onChange={setSearchValue}
          onClick={_handleSearch}
        />
      </SearchBox>
      <ListGroup variant="flush">
        {listItem.map((item) => (
          <ListGroup.Item key={item.id}>
            <StyledTitle
              style={{ float: "left" }}
              onClick={() => navigate("/boarddetail")}
            >
              {item.title}
            </StyledTitle>
            <StyledUser style={{ float: "right" }}>{item.user}</StyledUser>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <PageContainer>
        <Pagination
          page={page}
          lastPage={10}
          clickPrev={_handlePrev}
          clickNext={_handleNext}
        />
        <ButtonBox>
          <Button
            variant="outline-secondary"
            onClick={() => navigate("/writeCommunityBoard")}
          >
            +
          </Button>
        </ButtonBox>
      </PageContainer>
    </Container>
  );
}

export default Community;
