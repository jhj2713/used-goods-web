import { useState, useEffect } from "react";
import { FloatingLabel, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup, checkEmail } from "../modules/user";
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
const CheckBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const StyledCheck = styled.p`
  font-size: 15px;
  margin-top: 10px;
  margin-bottom: 0;
  cursor: pointer;
  :hover {
    color: gray;
  }
`;

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mailCheck } = useSelector(({ user }) => ({
    mailCheck: user.checkEmail,
  }));

  const [user, setUser] = useState({ email: "", username: "", password: "" });
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [checked, setChecked] = useState(false);

  const _handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const _handleSubmit = (e) => {
    e.preventDefault();
    if (!user.email) {
      setErrorMsg("이메일을 입력해주세요");
    } else if (user.username < 3) {
      setErrorMsg("이름을 3자 이상 입력해주세요");
    } else if (user.password.length < 6) {
      setErrorMsg("비밀번호를 6자 이상 입력해주세요");
    } else if (user.password !== passwordConfirm) {
      setErrorMsg("비밀번호가 일치하지 않습니다");
    } else if (!checked) {
      setErrorMsg("이메일 중복확인을 해주세요");
    } else {
      setErrorMsg("");
      dispatch(signup(user)).then(() => {
        navigate("/login");
      });
    }
  };
  const _handlePwdConfirm = (e) => {
    setPasswordConfirm(e.target.value);
  };
  const _handleCheck = () => {
    dispatch(checkEmail(user));
  };

  useEffect(() => {
    if (mailCheck === true) {
      setErrorMsg("");
      setChecked(true);
    } else if (mailCheck === false) {
      setErrorMsg("이미 존재하는 이메일입니다");
      setChecked(false);
    }
  }, [mailCheck]);

  return (
    <Container>
      <Form onSubmit={_handleSubmit}>
        <FloatingLabel className="mb-3" label="Email" controlId="floatingInput">
          <Form.Control
            name="email"
            value={user.email}
            onChange={_handleChange}
            type="email"
          />
          <CheckBox>
            <StyledCheck onClick={_handleCheck}>중복확인</StyledCheck>
          </CheckBox>
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
          <Button variant="secondary" onClick={() => navigate("/login")}>
            로그인하기
          </Button>
          <Button
            variant="outline-secondary"
            type="submit"
            style={{ marginLeft: 5 }}
          >
            회원가입
          </Button>
        </StyledButtons>
      </Form>
    </Container>
  );
}

export default Signup;
