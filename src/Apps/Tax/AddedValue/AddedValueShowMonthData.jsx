import React from "react";
import styled from "styled-components";
import { ButtonGroup, Button } from "@blueprintjs/core";
import { useDispatch } from "react-redux";
import {
  actionSetTaxPage,
  actionTaxAddTempValues,
  actionTaxGoBack,
} from "../../../redux/taxReducer";
const Container = styled.div`
  overflow: auto;
  position: absolute;
  top: 2rem;
  bottom: 0;
  right: 0;
  left: 0;
`;
const HeaderContainer = styled.div`
  height: 2rem;
  background-color: #eee;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
const ListItem = styled.li`
  cursor: pointer;
  text-decoration: underline;
  color: blue;
`;
const AddedValueShowMonthData = () => {
  const dispatch = useDispatch(null);
  return (
    <>
      <HeaderContainer>
        <ButtonGroup minimal={true} className="mr2">
          <Button
            intent="primary"
            icon="undo"
            onClick={() => dispatch(actionTaxGoBack())}
          />
        </ButtonGroup>
      </HeaderContainer>
      <Container className="ma2">
        <ul dir="rtl">
          <ListItem
            onClick={() => {
              dispatch(
                actionTaxAddTempValues({ key: "monthData", value: "purch" })
              );
              dispatch(actionSetTaxPage("AddedValueShowMonthDetails"));
            }}
          >
            مشتريات
          </ListItem>
          <ListItem
            onClick={() => {
              dispatch(
                actionTaxAddTempValues({ key: "monthData", value: "sale" })
              );
              dispatch(actionSetTaxPage("AddedValueShowMonthDetails"));
            }}
          >
            مبيعات
          </ListItem>
        </ul>
      </Container>
    </>
  );
};

export default AddedValueShowMonthData;
