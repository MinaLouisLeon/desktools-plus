import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taxPage: ["taxHomePage"],
  updateCounter : 0,
  addedValue: {
    users: [],
    tempCompanys: [],
    tempData: {},
  },
  tempValues: {},
};

const taxReducer = createSlice({
  name: "taxReducer",
  initialState,
  reducers: {
    actionSetTaxPage: (state, action) => {
      // handling navigation conditions
      if (action.payload === "AddCompany") {
        let userIndex = state.addedValue.users.findIndex(
          (user) => user.id === state.tempValues.userId
        );
        state.addedValue.tempCompanys =
          state.addedValue.users[userIndex].companys;
      }
      state.taxPage.push(action.payload);
    },
    actionTaxGoBack: (state, action) => {
      state.taxPage.pop();
    },
    actionTaxAddTempValues: (state, action) => {
      state.tempValues = {
        ...state.tempValues,
        [action.payload.key]: action.payload.value,
      };
      state.updateCounter = state.updateCounter + 1;
    },
    actionTaxAddUsers: (state, action) => {
      state.addedValue.users.push({
        name: action.payload.name,
        id: action.payload.id,
        companys: [],
        data: [],
        mainDate :[]
      });
      state.updateCounter = state.updateCounter + 1;
    },
    actionAddCompany: (state, action) => {
      let indexOfUser = state.addedValue.users.findIndex(
        (user) => user.id === action.payload.userId
      );
      state.addedValue.users[indexOfUser].companys.push({
        companyName: action.payload.companyName,
        companyAddress: action.payload.companyAddress,
        companyTaxId: action.payload.companyTaxId,
      });
      state.addedValue.tempCompanys.push({
        companyName: action.payload.companyName,
        companyAddress: action.payload.companyAddress,
        companyTaxId: action.payload.companyTaxId,
      });
      state.updateCounter = state.updateCounter + 1;
    },
    actionTaxAddedValueAddBillsValues : (state,action) => {
        state.addedValue.tempData = {
            ...state.addedValue.tempData,
            purchBillValue : action.payload.purchBillValue,
            saleBillValue : action.payload.saleBillValue,
            purchAddedValue : action.payload.purchAddedValue,
            saleAddedValue : action.payload.saleAddedValue
        }
        state.updateCounter = state.updateCounter + 1;
    },
    actionTaxAddedValueAddBillInfo : (state,action) => {
        state.addedValue.tempData = {
            ...state.addedValue.tempData,
            purchBillDate : action.payload.purchBillDate,
            saleBillDate : action.payload.saleBillDate,
            date : action.payload.date,
            productName : action.payload.productName,
            purchBillNumber : action.payload.purchBillNumber,
            saleBillNumber : action.payload.saleBillNumber,
        }
        state.updateCounter = state.updateCounter + 1;
    },
    actionTaxSelectCompany: (state, action) => {
      state.addedValue.tempData = {
        ...state.addedValue.tempData,
        companyName: action.payload.companyName,
        companyAddress: action.payload.companyAddress,
        companyTaxId: action.payload.companyTaxId,
      };
      state.updateCounter = state.updateCounter + 1;
    },
    actionAddBill: (state, action) => {
      let userIndex = state.addedValue.users.findIndex(user => user.id === state.tempValues.userId);
      state.addedValue.users[userIndex].data.push(state.addedValue.tempData);
      let dateIndex = state.addedValue.users[userIndex].mainDate.indexOf(state.addedValue.tempData.date);
      if(dateIndex === -1){
        state.addedValue.users[userIndex].mainDate.push(state.addedValue.tempData.date)
      }
      state.addedValue.tempData = {};
      state.updateCounter = state.updateCounter + 1;
      state.taxPage = state.taxPage.splice(0,3);
      
    },
    actionAddedValueDeleteBill : (state,action) => {
      let userIndex = state.tempValues.userIndex;
      state.addedValue.users[userIndex].data.splice(action.payload,1)
      state.updateCounter = state.updateCounter + 1;
    },
    actionTaxUpdateAddedValueData : (state,action) => {
      state.addedValue.users = action.payload.data
      state.updateCounter = action.payload.updateCounter
    }
  },
});

export const {
  actionTaxAddUsers,
  actionSetTaxPage,
  actionTaxGoBack,
  actionTaxAddTempValues,
  actionTaxAddedValueAddBillsValues,
  actionTaxAddedValueAddBillInfo,
  actionAddCompany,
  actionTaxSelectCompany,
  actionAddBill,
  actionAddedValueDeleteBill,
  actionTaxUpdateAddedValueData
} = taxReducer.actions;
export default taxReducer.reducer;
