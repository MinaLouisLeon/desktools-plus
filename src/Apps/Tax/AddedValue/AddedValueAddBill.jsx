import { FormGroup, InputGroup, ButtonGroup, Button } from "@blueprintjs/core";
import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import {
  actionTaxGoBack,
  actionTaxAddedValueAddBillInfo,
  actionSetTaxPage,
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
const AddedValueAddBill = () => {
  const dispatch = useDispatch(null);
  const [purchDate, setPurchDate] = useState(null);
  const [saleDate, setSaleDate] = useState(null);
  const [productName, setProductName] = useState("");
  const [purchBillNumber, setPurchBillNumber] = useState("");
  const [saleBillNumber, setSaleBillNumber] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const dateArr = purchDate.split("-");
    const monthArr = [
      "يناير",
      "فبراير",
      "مارس",
      "أبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر",
    ];
    const monthIndex = parseInt(dateArr[1], 10) - 1;
    dispatch(
      actionTaxAddedValueAddBillInfo({
        date: `${monthArr[monthIndex]}-${dateArr[0]}`,
        purchBillDate: purchDate,
        saleBillDate: saleDate,
        productName: productName,
        purchBillNumber: purchBillNumber,
        saleBillNumber: saleBillNumber,
      })
    );
    dispatch(actionSetTaxPage("AddedValueBillSummary"))
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
      <Container className="ma2 pr3">
        <form onSubmit={handleSubmit} dir="rtl">
          <FormGroup label="تاريخ الشراء :" labelFor="inputPurchDate">
            <InputGroup
              type="date"
              required={true}
              id="inputPurchDate"
              value={purchDate}
              onChange={(e) => setPurchDate(e.target.value)}
            />
          </FormGroup>
          <FormGroup label="تاريخ البيع :" labelFor="inputSaleDate">
            <InputGroup
              type="date"
              required={true}
              id="inputSaleDate"
              value={saleDate}
              onChange={(e) => setSaleDate(e.target.value)}
            />
          </FormGroup>
          <FormGroup label="إسم المنتج :" labelFor="inputProductName">
            <InputGroup
              type="text"
              id="inputProductName"
              required={true}
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </FormGroup>
          <FormGroup
            label="رقم فاتوره الشراء :"
            labelFor="inputPurchBillNumber"
          >
            <InputGroup
              id="inputPurchBillNumber"
              type="number"
              required={true}
              value={purchBillNumber}
              onChange={(e) => setPurchBillNumber(e.target.value)}
            />
          </FormGroup>
          <FormGroup label="رقم فاتوره البيع :" labelFor="inputSaleBillNumer">
            <InputGroup
              id="inputSaleBillNumer"
              type="number"
              required={true}
              value={saleBillNumber}
              onChange={(e) => setSaleBillNumber(e.target.value)}
            />
          </FormGroup>
          <div className="tc">
            <Button type="submit" intent="success">Next</Button>
          </div>
        </form>
      </Container>
    </>
  );
};

export default AddedValueAddBill;
