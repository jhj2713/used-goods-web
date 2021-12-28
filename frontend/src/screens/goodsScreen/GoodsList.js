import { useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";
import styled from "styled-components";
import Search from "../../components/Search";

const Container = styled.div`
  margin: 20px;
  padding-top: 30px;
`;
const PageContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const StyledCard = styled(Card)`
  width: 400px;
  cursor: pointer;
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

function GoodsList() {
  const navigate = useNavigate();
  const [goods, setGoods] = useState([
    { id: 1, src: "", title: "제목", summary: "요약문" },
    { id: 2, src: "", title: "제목", summary: "요약문" },
    { id: 3, src: "", title: "제목", summary: "요약문" },
    { id: 4, src: "", title: "제목", summary: "요약문" },
    { id: 5, src: "", title: "제목", summary: "요약문" },
    { id: 6, src: "", title: "제목", summary: "요약문" },
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
      <Row xs={1} md={2} lg={3} className="g-4">
        {goods.map((item) => (
          <Col key={item.id}>
            <StyledCard
              onClick={() => {
                navigate("/boardDetail");
              }}
            >
              <Card.Img variant="top" src="/image.png" />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.summary}</Card.Text>
              </Card.Body>
            </StyledCard>
          </Col>
        ))}
      </Row>
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
            onClick={() => navigate("/writeBoard")}
          >
            +
          </Button>
        </ButtonBox>
      </PageContainer>
    </Container>
  );
}

export default GoodsList;
