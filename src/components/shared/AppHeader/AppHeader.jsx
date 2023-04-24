import React from "react";
import styled from "styled-components";
import { Button, ButtonGroup, Icon } from "@blueprintjs/core";
const HeaderContainer = styled.div`
  width: 100%;
  height: 2rem;
  background-color: #eee;
  border-top-left-radius: 0.7rem;
  border-top-right-radius: 0.7rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const HeaderBtns = styled.div`
  background-color: transparent;
  display: flex;
`;
const AppHeader = ({appName}) => {
  return (
    <HeaderContainer className={"dragHandlerClass pl2"}>
        {appName}
        <HeaderBtns>
          
        </HeaderBtns>
    </HeaderContainer>
  );
};

export default AppHeader;
