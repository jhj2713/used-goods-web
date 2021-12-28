import { useState } from "react";
import { FloatingLabel, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 10%;
  margin-left: 10%;
  width: 35%;
  min-width: 350px;
`;
const StyledButtons = styled.div`
  float: right;
`;
const ErrorMsg = styled.p`
  font-size: 15px;
  color: red;
`;

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");

  const _handleChange = (e) => {
    setUser({ ...user, [e.target.type]: e.target.value });
  };
  const _handleSubmit = (e) => {
    e.preventDefault();
    if (!user.email) {
      setErrorMsg("이메일을 입력해주세요");
    } else if (!user.password) {
      setErrorMsg("비밀번호를 입력해주세요");
    } else {
      setErrorMsg("");
      navigate("/usedGoods");
    }
  };

  return (
    <Container>
      <Form onSubmit={_handleSubmit}>
        <FloatingLabel className="mb-3" label="Email" controlId="floatingInput">
          <Form.Control
            value={user.email}
            onChange={_handleChange}
            type="email"
            placeholder="Enter email"
          />
        </FloatingLabel>
        <FloatingLabel
          className="mb-3"
          label="Password"
          controlId="floatingInput"
        >
          <Form.Control
            value={user.password}
            onChange={_handleChange}
            type="password"
            placeholder="Enter password"
          />
        </FloatingLabel>
        <ErrorMsg>{errorMsg}</ErrorMsg>
        <StyledButtons>
          <Button variant="secondary" onClick={() => navigate("/signup")}>
            회원가입하기
          </Button>
          <Button
            variant="outline-secondary"
            type="submit"
            style={{ marginLeft: 5 }}
          >
            로그인
          </Button>
        </StyledButtons>
      </Form>
    </Container>
  );
}

export default Login;
