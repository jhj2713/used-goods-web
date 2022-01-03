import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FloatingLabel, Form } from "react-bootstrap";
import styled from "styled-components";

const Container = styled.div`
  margin: 10%;
  width: 80%;
`;

function UserUpdate() {
  const { oldUser } = useSelector(({ user }) => ({
    oldUser: user.user,
  }));
  const [user, setUser] = useState({});

  const _handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setUser(oldUser);
  }, []);

  return (
    <Container>
      <Form>
        <FloatingLabel className="mb-3" label="Email" controlId="floatingInput">
          <Form.Control
            name="email"
            value={user.email}
            onChange={_handleChange}
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
            onChange={_handleChange}
            type="text"
            disabled
          />
        </FloatingLabel>
      </Form>
    </Container>
  );
}

export default UserUpdate;
