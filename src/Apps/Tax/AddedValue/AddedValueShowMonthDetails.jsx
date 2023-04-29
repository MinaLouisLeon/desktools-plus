import React from "react";
import { ButtonGroup, Button } from "@blueprintjs/core";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionAddedValueDeleteBill, actionTaxGoBack } from "../../../redux/taxReducer";
import "./AddedValueShowMonthDetails.css";
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
const AddedValueShowMonthDetails = () => {
  const dispatch = useDispatch(null);
  const userIndex = useSelector(
    (state) => state.taxReducer.tempValues.userIndex
  );
  const selectedMonth = useSelector(
    (state) => state.taxReducer.tempValues.selectedMonth
  );
  const monthData = useSelector(
    (state) => state.taxReducer.tempValues.monthData
  );
  const data = useSelector(
    (state) => state.taxReducer.addedValue.users[userIndex].data
  );
  const handleExportCSV = () => {
    if(monthData === "purch"){
      var purchrows = [
        [
          "نوع المستند (فاتورة 1/ إشعار إضافة 2/إشعار خصم 3/إذن إفراج 4)",
          "نوع الضريبة (سلع عامة 1/سلع جدول 2)",
          "نوع سلع الجدول (لايوجد 0/جدول أولا 1/جدول ثانيا 2)",
          "رقم الفاتورة",
          "اسم المورد",
          "رقم التسجيل الضريبي للعميل",
          "رقم الملف الضريبي للعميل",
          "العنوان",
          "الرقم القومي",
          "رقم الموبيل",
          "تاريخ الفاتورة",
          "إسم المنتج",
          "كود المنتج",
          "نوع البيان (محلي 1/مستورد 2/تسويات 5)",
          "نوع السلعة (سلع 3/خدمات 4/آلات ومعدات 5/أجزاء آلات 6/إعفاءات 7)",
          "وحدة قياس المنتج",
          "سعر الوحدة",
          "فئة الضريبة (14%/5%)",
          "كمية المنتج",
          "المبلغ الصافي",
          "قيمة الضريبة",
          "إجمالي",
        ],
      ];
      var purchcsvRows = [];
      data.forEach((bill) => {
        if (bill.date === selectedMonth) {
          var purchDateArr = bill.purchBillDate.split("-");
          var purchDate = `${purchDateArr[2]}/${purchDateArr[1]}/${purchDateArr[0]}`;
          var totalPurch = (
            parseFloat(bill.purchAddedValue) + parseFloat(bill.purchBillValue)
          ).toFixed(2);
          purchrows.push([
            1,
            1,
            0,
            bill.purchBillNumber,
            bill.companyName,
            bill.companyTaxId,
            "",
            bill.companyAddress,
            "",
            "",
            purchDate,
            bill.productName,
            "",
            1,
            3,
            "",
            bill.purchValue,
            14,
            1,
            bill.purchBillValue,
            bill.purchAddedValue,
            totalPurch,
          ]);
        }
      });
      purchrows.forEach((row) => {
        var purchrowStr = row.join(",");
        purchcsvRows.push(purchrowStr);
      });
      var purchcsvData = purchcsvRows.join("\n");
      downloadCSV("Purchases_ar.csv", purchcsvData);
    }else{
      var salerows = [
        [
          "نوع المستند (فاتورة 1/ إشعار إضافة 2/إشعار خصم 3/مستهلك نهائي محلي 5/جهة-حكومة 6/مستهلك نهائي أجنبي 7)",
          "نوع الضريبة (سلع عامة 1/سلع جدول 2)",
          "نوع سلع الجدول (لايوجد 0/جدول أولا 1/جدول ثانيا 2)",
          "رقم الفاتورة",
          "اسم العميل",
          "رقم التسجيل الضريبي للعميل",
          "رقم الملف الضريبي للعميل",
          "العنوان",
          "الرقم القومي / رقم جواز السفر",
          "رقم الموبيل",
          "تاريخ الفاتورة",
          "إسم المنتج",
          "كود المنتج",
          "نوع البيان (سلعة 3/خدمة 4/تسويات 5)",
          "نوع السلعة (محلي 1/صادرات 2/آلات ومعدات 5/أجزاء آلات 6/إعفاءات 7 /  سلع الجدول  مراجعة الإرشادات ) ",
          "وحدة قياس المنتج",
          "سعر الوحدة",
          "فئة الضريبة (14%/5%)",
          "كمية المنتج",
          "المبلغ الصافي",
          "قيمة الضريبة",
          "إجمالي",
        ],
      ];
      var salecsvRows = [];
      data.forEach(bill => {
        if(bill.date === selectedMonth){
          var saleDateArr = bill.saleBillDate.split("-");
          var saleDate = `${saleDateArr[2]}/${saleDateArr[1]}/${saleDateArr[0]}`;
          var totalSale = (parseFloat(bill.saleBillValue) + parseFloat(bill.saleAddedValue)).toFixed(2);
          salerows.push([
            5,
            1,
            0,
            bill.saleBillNumber,
            "مستهلك نهائى",
            "",
            "",
            "الاسكندريه",
            "",
            "",
            saleDate,
            bill.productName,
            "",
            3,
            1,
            bill.saleValue,
            "",
            14,
            1,
            bill.saleBillValue,
            bill.saleAddedValue,
            totalSale,
          ]);
        }
      });
      salerows.forEach((row) => {
        var rowStr = row.join(",");
        salecsvRows.push(rowStr);
      });
      var salecsvData = salecsvRows.join("\n");
      downloadCSV("Sales_ar.csv", salecsvData);
    }
  };
  const downloadCSV = (filename, filedata) => {
    var csvFile = new Blob([filedata], { type: "text/csv" });
    var tempLink = document.createElement("a");
    tempLink.download = filename;
    var url = window.URL.createObjectURL(csvFile);
    tempLink.href = url;
    tempLink.style.display = "none";
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    // var platformsArr = getPlatforms();
    // platformsArr.forEach(async (platform) => {
    //   if (platform === "android") {
    //     await writeSecretFile(filename, filedata);
    //   } else {
    //     if (webDownloadcounter === 0) {
    //       var csvFile = new Blob([filedata], { type: "text/csv" });
    //       var tempLink = document.createElement("a");
    //       tempLink.download = filename;
    //       var url = window.URL.createObjectURL(csvFile);
    //       tempLink.href = url;
    //       tempLink.style.display = "none";
    //       document.body.appendChild(tempLink);
    //       tempLink.click();
    //       document.body.removeChild(tempLink);
    //       setWebDownloadCounter(webDownloadcounter + 1);
    //     }
  };
  return (
    <>
      <HeaderContainer>
        <ButtonGroup minimal={true} className="mr2">
          <Button intent="primary" icon="import" onClick={() => handleExportCSV()}/>
          <Button
            intent="primary"
            icon="undo"
            onClick={() => dispatch(actionTaxGoBack())}
          />
        </ButtonGroup>
      </HeaderContainer>
      <Container className="ma2" dir="rtl">
      {monthData === "purch" ? <h5>مشتريات</h5> : <h5>مبيعات</h5>}
        {data && (
          <table>
            <thead>
              <th>التاريخ</th>
              <th>رقم الفاتوره</th>
              <th>قيمه الفاتوره</th>
              <th>القيمه المضافه</th>
              <th>مسح</th>
            </thead>
            <tbody>
              {monthData === "purch" ? (
                <>
                  {data &&
                    data.map((bill,index) => {
                      return (
                        <>
                          {bill.date === selectedMonth ? (
                            <tr>
                              <td>{bill.purchBillDate}</td>
                              <td>{bill.purchBillNumber}</td>
                              <td>{bill.purchBillValue}</td>
                              <td>{bill.purchAddedValue}</td>
                              <td>
                                <Button
                                  intent="danger"
                                  icon="trash"
                                  minimal={true}
                                  onClick={() => dispatch(actionAddedValueDeleteBill(index))}
                                />
                              </td>
                            </tr>
                          ) : (
                            <></>
                          )}
                        </>
                      );
                    })}
                </>
              ) : (
                <>
                  {data &&
                    data.map((bill,index) => {
                      return (
                        <>
                          {bill.date === selectedMonth ? (
                            <tr>
                              <td>{bill.saleBillDate}</td>
                              <td>{bill.saleBillNumber}</td>
                              <td>{bill.saleBillValue}</td>
                              <td>{bill.saleAddedValue}</td>
                              <td>
                                <Button
                                  intent="danger"
                                  icon="trash"
                                  minimal={true}
                                  onClick={() => dispatch(actionAddedValueDeleteBill(index))}
                                />
                              </td>
                            </tr>
                          ) : (
                            <></>
                          )}
                        </>
                      );
                    })}
                </>
              )}
            </tbody>
          </table>
        )}
      </Container>
    </>
  );
};

export default AddedValueShowMonthDetails;
