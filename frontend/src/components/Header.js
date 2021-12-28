import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  font-size: 20px;
  color: gray;
  margin: 25px;
  text-decoration: none;
  :hover {
    color: lightgray;
  }
`;

function Header() {
  return (
    <Nav className="justify-content-end" activeKey="/login">
      <StyledLink to="/usedGoods">중고거래</StyledLink>
      <StyledLink to="/community">커뮤니티</StyledLink>
      <StyledLink to="/mypage">마이페이지</StyledLink>
    </Nav>
  );
}

export default Header;
