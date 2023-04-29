import React from 'react'
import { Button,ButtonGroup } from '@blueprintjs/core';
import { useDispatch,useSelector } from 'react-redux';
import { actionSetTaxPage, actionTaxAddTempValues, actionTaxGoBack } from '../../../redux/taxReducer';
import styled from "styled-components";
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
const AddedValueInfo = () => {
  const dispatch = useDispatch(null);
  const userIndex = useSelector(state => state.taxReducer.tempValues.userIndex);
  const mainDate = useSelector(state => state.taxReducer.addedValue.users[userIndex].mainDate)
  
  return (
    <>
    {/* <AddedValueCalc /> */}
    <HeaderContainer>
        <ButtonGroup minimal={true} className="mr2">
          <Button 
            intent='primary'
            icon="insert"
            onClick={() => dispatch(actionSetTaxPage("AddedValueCalc"))}
          />
          <Button
            intent="primary"
            icon="undo"
            onClick={() => dispatch(actionTaxGoBack())}
          />
        </ButtonGroup>
      </HeaderContainer>
      <Container className="ma2">
        <ul dir='rtl'>
          {mainDate && mainDate.map((date) => {
            return(
              <ListItem onClick={() => {
                dispatch(actionTaxAddTempValues({
                  key : "selectedMonth",
                  value : date
                }))
                dispatch(actionSetTaxPage("AddedValueShowMonthData"));
              }}>{date}</ListItem>
            )
          })}
        </ul>
      </Container>
    </>
  )
}

export default AddedValueInfo
