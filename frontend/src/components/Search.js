import { InputGroup, Button, FormControl } from "react-bootstrap";
import styled from "styled-components";

const Container = styled.div`
  width: 300px;
`;

function Search({ value, onChange, onClick }) {
  const _handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <Container>
      <InputGroup>
        <FormControl value={value} onChange={_handleChange} />
        <Button variant="outline-secondary" onClick={onClick}>
          검색
        </Button>
      </InputGroup>
    </Container>
  );
}

export default Search;
