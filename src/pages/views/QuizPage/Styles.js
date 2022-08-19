import { Link } from "react-router-dom";
import styled from "styled-components";
import { mainColor } from "../../../utils/constant";

export const RoundBtn = styled.span`
  padding: 10px 40px;
  font-size: 20px;
  color: ${mainColor};
  background: transparent;
  font-weight: bold;
  border: 2px solid ${mainColor};
  width: fit-content;
  border-radius: 50px;
  cursor: pointer;
  &:hover {
    background-color: ${mainColor};
    color: white;
    transition: .3s;
  }
`;

export const RoundLink = styled(Link)`
  padding: 10px 40px;
  font-size: 20px;
  color: ${mainColor};
  background: transparent;
  font-weight: bold;
  border: 2px solid ${mainColor};
  width: fit-content;
  border-radius: 50px;
  cursor: pointer;
  &:hover {
    background-color: ${mainColor};
    color: white;
    transition: .3s;
  }
`;