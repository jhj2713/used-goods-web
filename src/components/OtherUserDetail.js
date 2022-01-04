import { FloatingLabel, Form } from "react-bootstrap";
import styled from "styled-components";

const Container = styled.div`
  margin: 10%;
  width: 80%;
`;

function OtherUserDetail({ user }) {
  return (
    <Container>
      <Form>
        <FloatingLabel className="mb-3" label="Email" controlId="floatingInput">
          <Form.Control
            name="email"
            value={user.email}
            type="email"
            placeholder="Enter email"
            disabled
          />
        </FloatingLabel>
        <FloatingLabel
          className="mb-3"
          label="Username"
          controlId="floatingInput"
        >
          <Form.Control
            name="displayName"
            value={user.displayName}
            type="text"
            disabled
          />
        </FloatingLabel>
      </Form>
    </Container>
  );
}

export default OtherUserDetail;
