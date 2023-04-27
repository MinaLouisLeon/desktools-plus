import React from "react";
import styled from "styled-components";
import { Button, ButtonGroup, Icon } from "@blueprintjs/core";
import { useDispatch } from "react-redux";
// eslint-disable-next-line
import ContextMenuComp from "../ContextMenuComp/ContextMenuComp";
import {
  actionCloseApp,
  actionHideApp,
  actionMaxApp,
  actionMinApp,
  actionUpdateZindex,
} from "../../../redux/AppsReducer";
import IconProviderComp from "../IconProviderComp/IconProviderComp";
const HeaderContainer = styled.div`
  width: 100%;
  height: 2rem;
  background-color: #eee;
  border-top-left-radius: 0.7rem;
  border-top-right-radius: 0.7rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
`;
const HeaderBtns = styled.div`
  background-color: transparent;
  display: flex;
`;
const AppHeader = ({ appName, appKey, iconName, isFullscreen }) => {
  const dispatch = useDispatch(null);
  return (
    <HeaderContainer className="pl2" onClick={() => dispatch(actionUpdateZindex(appKey))}>
      <HeaderTitle>
        <IconProviderComp iconName={iconName} settings={{size:"1.5rem"}}/>
        <div className="ml2">{appName}</div>
      </HeaderTitle>
      <HeaderBtns>
        <ButtonGroup minimal={true}>
          <Button className="dragHandlerClass" icon="move" intent="primary" />
          <Button icon="minus" intent="primary" 
            onClick={() => dispatch(actionHideApp(appKey))}
          />
          {isFullscreen ? (
            <Button
              intent="primary"
              icon="minimize"
              onClick={() => dispatch(actionMinApp({ appKey: appKey }))}
            />
          ) : (
            <Button
              onClick={() => dispatch(actionMaxApp({ appKey: appKey }))}
              icon="maximize"
              intent="primary"
            />
          )}

          <Button
            onClick={() =>
              dispatch(
                actionCloseApp({
                  appKey: appKey,
                  appName: appName,
                })
              )
            }
          >
            <Icon icon="cross" color="#ac2f33" />
          </Button>
        </ButtonGroup>
      </HeaderBtns>
    </HeaderContainer>
  );
};

export default AppHeader;
