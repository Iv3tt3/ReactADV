import styled from "styled-components";

const Button = styled.button`
  border: none;
  font-family: Arial, Helvetica, sans-serif;
  color: white;
  text-decoration: none;
  padding: 8pt 30pt;
  cursor: pointer;
  border-radius: 3px;
  background-color: #0056b3;
  transition: transform 0.3s ease-in-out;
  font-size: medium;
  &:hover {
    background-color: lightgrey;
    color: black;
    transition: all 1s ease-in-out;
  }
  &:active {
    transform: scale(0.9);
  }
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
`;

export default Button;
