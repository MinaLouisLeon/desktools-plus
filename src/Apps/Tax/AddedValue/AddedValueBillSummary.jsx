import { ButtonGroup, Button } from "@blueprintjs/core";
import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionAddBill, actionTaxGoBack } from "../../../redux/taxReducer";
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
const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
`
const AddedValueBillSummary = () => {
  const dispatch = useDispatch(null);
  const billData = useSelector((state) => state.taxReducer.addedValue.tempData);
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
      <Container>
        {billData && (
          <>
          <ul dir="rtl">
            <li>المشتريات : {billData.purchBillValue}</li>
            <li>القيمة المضافة علي المشتريات : {billData.purchAddedValue}</li>
            <li>المبيعات : {billData.saleBillValue}</li>
            <li>القيمة المضافة علي المبيعات : {billData.saleAddedValue}</li>
            <li>تاريخ الشراء : {billData.purchBillDate}</li>
            <li>تاريخ البيع : {billData.saleBillDate}</li>
            <li>إسم المنتج : {billData.productName}</li>
            <li>رقم فاتوره الشراء : {billData.purchBillNumber}</li>
            <li>رقم فاتوره البيع : {billData.saleBillNumber}</li>
            <li>شركه : {billData.companyName}</li>
            <li>العنوان : {billData.companyAddress}</li>
            <li>رقم السجل الضريبي : {billData.companyTaxId}</li>
          </ul>
          <ButtonContainer dir="rtl">
          <Button intent="success" onClick={() => dispatch(actionAddBill())}>Save Bill</Button>
          <Button intent="danger">Cancel</Button>
          </ButtonContainer>
          </>
        )}
      </Container>
    </>
  );
};

export default AddedValueBillSummary;
