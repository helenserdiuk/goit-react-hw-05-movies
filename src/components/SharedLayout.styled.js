import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
  width: 100%;
  height: 30px;
  padding: 20px 20px;
  border-bottom: 1px solid grey;
  box-shadow: 0px 0px 5px;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  width: 100% > nav {
    display: flex;
  }
`;

export const Link = styled(NavLink)`
  padding: 8px 16px;
  border: none;
  text-decoration: none;
  color: black;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;

  &.active {
    color: orangered;
  }
`;
