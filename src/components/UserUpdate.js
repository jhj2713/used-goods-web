import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../modules/user";
import { FloatingLabel, Form, Toast, Button } from "react-bootstrap";
import styled from "styled-components";

const Container = styled.div`
  margin: 10%;
  width: 80%;
`;
const StyledButtons = styled.div`
  float: right;
`;
const ErrorMsg = styled.p`
  font-size: 15px;
  color: red;
`;

function UserUpdate({ user }) {
  const dispatch = useDispatch();

  const [newUser, setNewUser] = useState(user);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [show, setShow] = useState(false);

  const _handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };
  const _handlePwdConfirm = (e) => {
    setPasswordConfirm(e.target.value);
  };
  const _handleSubmit = (e) => {
    e.preventDefault();
    if (newUser.password < 6) {
      setErrorMsg("비밀번호를 6자 이상 입력해주세요");
    } else if (newUser.password !== passwordConfirm) {
      setErrorMsg("비밀번호가 일치하지 않습니다");
    } else {
      setErrorMsg("");
      dispatch(updateUser(newUser)).then(() => {
        setShow(true);
      });
    }
  };

  return (
    <Container>
      <Form onSubmit={_handleSubmit}>
        <FloatingLabel className="mb-3" label="Email" controlId="floatingInput">
          <Form.Control
            name="email"
            value={newUser.email}
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
            value={newUser.displayName}
            type="text"
            disabled
          />
        </FloatingLabel>
        <FloatingLabel
          className="mb-3"
          label="Password"
          controlId="floatingInput"
        >
          <Form.Control
            name="password"
            value={newUser.password}
            onChange={_handleChange}
            type="password"
          />
        </FloatingLabel>
        <FloatingLabel
          className="mb-3"
          label="Password Confirm"
          controlId="floatingInput"
        >
          <Form.Control
            value={passwordConfirm}
            onChange={_handlePwdConfirm}
            type="password"
          />
        </FloatingLabel>
        <ErrorMsg>{errorMsg}</ErrorMsg>
        <StyledButtons>
          <Button
            variant="outline-secondary"
            type="submit"
            style={{ marginLeft: 5 }}
          >
            수정하기
          </Button>
          <Toast
            onClose={() => setShow(false)}
            show={show}
            delay={3000}
            autohide
            style={{ position: "absolute", width: 200 }}
          >
            <Toast.Body>수정이 완료되었습니다</Toast.Body>
          </Toast>
        </StyledButtons>
      </Form>
    </Container>
  );
}

export default UserUpdate;
