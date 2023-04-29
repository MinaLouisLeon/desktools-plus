import React from "react";
import ItemGridComp from "../../components/shared/ItemGridComp/ItemGridComp";
import { useSelector, useDispatch } from "react-redux";
import { actionSetTaxPage } from "../../redux/taxReducer";
import AddedValue from "./AddedValue/AddedValue";
import AddedValueInfo from "./AddedValue/AddedValueInfo";
import AddedValueAddCompany from "./AddedValue/AddedValueAddCompany";
import AddedValueAddBill from "./AddedValue/AddedValueAddBill";
import AddedValueBillSummary from "./AddedValue/AddedValueBillSummary";
import AddedValueShowMonthData from "./AddedValue/AddedValueShowMonthData";
import AddedValueShowMonthDetails from "./AddedValue/AddedValueShowMonthDetails";
import AddedValueCalc from "./AddedValue/AddedValueCalc";
const Tax = () => {
  const dispatch = useDispatch(null);
  const taxPage = useSelector((state) => state.taxReducer.taxPage);
  const handlePage = () => {
    let pageName = taxPage.slice(-1);
    switch (pageName[0]) {
      case "taxHomePage":
        return (
          <ItemGridComp
            items={[
              {
                text: "Added Value",
                icon: "tax",
                handler: () => dispatch(actionSetTaxPage("addedValue")),
              },
            ]}
          />
        );
      case "addedValue":
        return <AddedValue />;
      case "addedValueInfo":
        return <AddedValueInfo />;
      case "AddCompany":
        return <AddedValueAddCompany />;
      case "AddedValueAddBill":
        return <AddedValueAddBill />;
      case "AddedValueBillSummary":
        return <AddedValueBillSummary />;
      case "AddedValueShowMonthData":
        return <AddedValueShowMonthData />;
      case "AddedValueShowMonthDetails":
        return <AddedValueShowMonthDetails />;
      case "AddedValueCalc":
        return <AddedValueCalc />;
      default:
        break;
    }
  };
  return <>{handlePage()}</>;
};

export default Tax;
