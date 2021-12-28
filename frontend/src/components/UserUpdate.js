import { useState } from "react";
import { FloatingLabel, Form, Button, Toast } from "react-bootstrap";
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

function UserUpdate() {
  const [user, setUser] = useState({
    email: "email@gmail.com",
    username: "username",
    password: "",
  });
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const _handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const _handleSubmit = (e) => {
    e.preventDefault();
    if (!user.email) {
      setErrorMsg("이메일을 입력해주세요");
    } else if (user.username < 3) {
      setErrorMsg("이름을 3자 이상 입력해주세요");
    } else if (user.password < 6) {
      setErrorMsg("비밀번호를 6자 이상 입력해주세요");
    } else if (user.password !== passwordConfirm) {
      setErrorMsg("비밀번호가 일치하지 않습니다");
    } else {
      setErrorMsg("");
      setShow(true);
    }
  };
  const _handlePwdConfirm = (e) => {
    setPasswordConfirm(e.target.value);
  };

  return (
    <Container>
      <Form onSubmit={_handleSubmit}>
        <FloatingLabel className="mb-3" label="Email" controlId="floatingInput">
          <Form.Control
            name="email"
            value={user.email}
            onChange={_handleChange}
            type="email"
            placeholder="Enter email"
          />
        </FloatingLabel>
        <FloatingLabel
          className="mb-3"
          label="Username"
          controlId="floatingInput"
        >
          <Form.Control
            name="username"
            value={user.username}
            onChange={_handleChange}
            type="text"
          />
        </FloatingLabel>
        <FloatingLabel
          className="mb-3"
          label="Password"
          controlId="floatingInput"
        >
          <Form.Control
            name="password"
            value={user.password}
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
