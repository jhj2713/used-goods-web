import { useState, useEffect } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadGoods } from "../../modules/goods";
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
  const dispatch = useDispatch();
  const { goodsBoards } = useSelector(({ goods }) => ({
    goodsBoards: goods.goodsBoards,
  }));

  const [goods, setGoods] = useState([]);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [isLast, setIsLast] = useState(false);

  const _handlePrev = () => {
    setPage((page) => page - 1);
  };
  const _handleNext = () => {
    setPage((page) => page + 1);
  };
  const _handleSearch = () => {
    dispatch(loadGoods({ searchValue }));
  };

  const setImgTag = (item) => {
    const content = item.content.split(`<img src="`)[1].split(`"`)[0];
    return <Card.Img variant="top" src={content} />;
  };

  useEffect(() => {
    dispatch(loadGoods({ searchValue }));
  }, []);
  useEffect(() => {
    setGoods(goodsBoards);
  }, [goodsBoards]);
  useEffect(() => {
    setGoods(goodsBoards.slice((page - 1) * 6, page * 6));
    if (goodsBoards.length < 6 * page) {
      setIsLast(true);
    }
  }, [goodsBoards, page]);

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
        {goods &&
          goods.map((item) => (
            <Col key={item.id}>
              <StyledCard
                onClick={() => {
                  navigate("/goodsDetail/" + item.id);
                }}
              >
                {item.content.includes("img") ? (
                  setImgTag(item)
                ) : (
                  <Card.Img variant="top" src="/image.png" />
                )}
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                </Card.Body>
              </StyledCard>
            </Col>
          ))}
      </Row>
      <PageContainer>
        <Pagination
          page={page}
          isLast={isLast}
          clickPrev={_handlePrev}
          clickNext={_handleNext}
        />
        <ButtonBox>
          <Button
            variant="outline-secondary"
            onClick={() => navigate("/writeGoodsBoard")}
          >
            +
          </Button>
        </ButtonBox>
      </PageContainer>
    </Container>
  );
}

export default GoodsList;
