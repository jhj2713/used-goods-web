import styled from "styled-components";
import { Button } from "react-bootstrap";

const Container = styled.div`
  margin-top: 20px;
  display: flex;
`;
const StyledPage = styled.p`
  margin: 5px;
`;

function Pagination({ page, lastPage, clickPrev, clickNext }) {
  return (
    <Container>
      <Button variant="secondary" disabled={page === 1} onClick={clickPrev}>
        Prev
      </Button>
      <StyledPage>{page}</StyledPage>
      <Button
        variant="secondary"
        disabled={page === lastPage}
        onClick={clickNext}
      >
        Next
      </Button>
    </Container>
  );
}

export default Pagination;
