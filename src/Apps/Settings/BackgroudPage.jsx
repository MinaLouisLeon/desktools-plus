import React from "react";
import ItemGridComp from "../../components/shared/ItemGridComp/ItemGridComp";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import {
  actionSetBackground,
  actionSettingsAppGoBack,
} from "../../redux/settingsReducer";
import { Button, ButtonGroup } from "@blueprintjs/core";
const BackgroundItemcontainer = styled.div`
  background-color: ${(props) => props.backgroundColor};
  background-image: ${(props) => props.backgroundImage};
  width: 3rem;
  height: 3rem;
  cursor: pointer;
`;
const OptionBar = styled.div`
  width: 100%;
  height: 2rem;
  background-color: #eee;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
const ContentContainer = styled.div`
  position: absolute;
  bottom: 0;
  top: 2rem;
`;
const BackgroudPage = () => {
  const backgrounds = useSelector((state) => state.settingsReducer.backgrounds);
  const dispatch = useDispatch(null);
  return (
    <>
      <OptionBar>
        <ButtonGroup minimal={true} className="mr2">
          <Button
            icon="undo"
            intent="primary"
            onClick={() => dispatch(actionSettingsAppGoBack())}
          />
        </ButtonGroup>
      </OptionBar>
      <ContentContainer>
        <ItemGridComp>
          {backgrounds &&
            backgrounds.map((background) => {
              return (
                <BackgroundItemcontainer
                  className="ma2 pa1 br2"
                  backgroundColor={background.backgroundColor}
                  backgroundImage={background.backgroundImage}
                  onClick={() =>
                    dispatch(
                      actionSetBackground({
                        backgroundColor: background.backgroundColor,
                        backgroundImage: background.backgroundImage,
                      })
                    )
                  }
                />
              );
            })}
        </ItemGridComp>
      </ContentContainer>
    </>
  );
};

export default BackgroudPage;
