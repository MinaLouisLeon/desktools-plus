import { FormGroup, InputGroup, Button, ButtonGroup } from "@blueprintjs/core";
import { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { actionSetTaxPage, actionTaxAddedValueAddBillsValues, actionTaxGoBack } from "../../../redux/taxReducer";
const HeaderContainer = styled.div`
  height: 2rem;
  background-color: #eee;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
const Container = styled.div`
  overflow: auto;
  position: absolute;
  top: 2rem;
  bottom: 0;
  right: 0;
  left: 0;
`;
const AddedValueCalc = () => {
  const dispatch = useDispatch(null);
  const [addedValue, setAddedValue] = useState("");
  const handleSubmitNewBill = (e) => {
    e.preventDefault();
    let purchValue = ((addedValue * 100) / 14).toFixed(2);
    let saleValue = ((((addedValue * 100) / 14) * 115) / 100).toFixed(2);
    let saleAddedValue = ((saleValue*14)/100).toFixed(2);
    dispatch(actionTaxAddedValueAddBillsValues({
        purchBillValue:purchValue,
        saleBillValue:saleValue,
        purchAddedValue:addedValue,
        saleAddedValue:saleAddedValue
    }))
    dispatch(actionSetTaxPage("AddCompany"));
  };
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
      <form onSubmit={handleSubmitNewBill} className="ma3">
        <FormGroup label="Added Value:" labelFor="addedValue">
          <InputGroup
            value={addedValue}
            id="addedValue"
            onChange={(e) => setAddedValue(e.target.value)}
          />
        </FormGroup>
        <Button intent="success" type="submit">
          Calculate Bill
        </Button>
      </form>
      </Container>
    </>
  );
};

export default AddedValueCalc;
