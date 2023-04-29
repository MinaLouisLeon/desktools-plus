import React, { useState } from "react";
import styled from "styled-components";
import { Button, ButtonGroup, FormGroup, InputGroup } from "@blueprintjs/core";
import { useDispatch, useSelector } from "react-redux";
import { actionAddCompany, actionSetTaxPage, actionTaxGoBack, actionTaxSelectCompany } from "../../../redux/taxReducer";
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
const AddedValueAddCompany = () => {
  const dispatch = useDispatch(null);
  const userId = useSelector((state) => state.taxReducer.tempValues.userId);
  const companys = useSelector(
    (state) => state.taxReducer.addedValue.tempCompanys
  );
  const [addNewCompany, setAddNewCompany] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyTaxId, setCompanyTaxId] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      actionAddCompany({
        companyName,
        companyAddress,
        companyTaxId,
        userId,
      })
    );
    setCompanyAddress("");
    setCompanyName("");
    setCompanyTaxId("");
    setAddNewCompany(false);
  };
  return (
    <>
      <HeaderContainer>
        <ButtonGroup minimal={true} className="mr2">
          <Button
            icon="new-layers"
            intent="primary"
            onClick={() => setAddNewCompany(true)}
          />
          <Button
            intent="primary"
            icon="undo"
            onClick={() => dispatch(actionTaxGoBack())}
          />
        </ButtonGroup>
      </HeaderContainer>
      <Container className="ma2">
        {addNewCompany ? (
          <>
            <form onSubmit={handleSubmit}>
              <FormGroup label="Company Name :" labelFor="inputCompanyName">
                <InputGroup
                  type="text"
                  id="inputCompanyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </FormGroup>
              <FormGroup label="Company Address" labelFor="inputCompanyAddress">
                <InputGroup
                  type="text"
                  id="inputCompanyAddress"
                  value={companyAddress}
                  onChange={(e) => setCompanyAddress(e.target.value)}
                />
              </FormGroup>
              <FormGroup
                label="Company Register Id :"
                labelFor="inputCompanyId"
              >
                <InputGroup
                  type="number"
                  id="inputCompanyId"
                  value={companyTaxId}
                  onChange={(e) => setCompanyTaxId(e.target.value)}
                />
              </FormGroup>
              <Button intent="success" type="submit">
                Add Company
              </Button>
            </form>
          </>
        ) : (
          <>
            <h5>Select Company :</h5>
            <ul dir="rtl">
              {companys &&
                companys.map((company) => {
                  return <ListItem onClick={() => {
                    dispatch(actionTaxSelectCompany({
                      companyName : company.companyName,
                      companyAddress : company.companyAddress,
                      companyTaxId : company.companyTaxId
                    }))
                    dispatch(actionSetTaxPage("AddedValueAddBill"))
                  }}>{company.companyName}</ListItem>;
                })}
            </ul>
          </>
        )}
      </Container>
    </>
  );
};

export default AddedValueAddCompany;
