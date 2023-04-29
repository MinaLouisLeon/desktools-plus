import styled from "styled-components";
import { useState } from "react";
import { ButtonGroup, Button, InputGroup, FormGroup } from "@blueprintjs/core";
import { useDispatch, useSelector } from "react-redux";
import {
  actionSetTaxPage,
  actionTaxAddTempValues,
  actionTaxAddUsers,
  actionTaxGoBack,
  actionTaxUpdateAddedValueData,
} from "../../../redux/taxReducer";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
const MainContainer = styled.div`
  width: 100%;
  height: 100%;
`;
const HeaderContainer = styled.div`
  height: 2rem;
  background-color: #eee;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  bottom: 0px;
  top: 2rem;
  width: 100%;
  overflow: auto;
`;
const ListItem = styled.li`
  cursor: pointer;
  text-decoration: underline;
  color: blue;
`;
const AddedValue = () => {
  const dispatch = useDispatch(null);
  const [addUser, setAddUser] = useState(false);
  const [addUserName, setAddUserName] = useState("");
  const [addUserId, setAddUserId] = useState("");
  const users = useSelector((state) => state.taxReducer.addedValue.users);
  const uid = useSelector(
    (state) => state.loggedInUserReducer.userInfo.payload.uid
  );
  const updateCounter = useSelector((state) => state.taxReducer.updateCounter);
  const handleSubmitNewUser = (e) => {
    e.preventDefault();
    if (addUserName !== "" || addUserId !== "") {
      dispatch(
        actionTaxAddUsers({
          name: addUserName,
          id: addUserId,
        })
      );
      setAddUserName("");
      setAddUserId("");
      setAddUser(false);
    }
  };
  const handleUpdateTax = async () => {
    const docRef = doc(db, `${uid}/tax/AddedValue`, "updateCounter");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let data = docSnap.data();
      let serverUpdateCounter = parseInt(data.updateCounter);
      if (serverUpdateCounter < parseInt(updateCounter)) {
        await setDoc(doc(db, `${uid}/tax/AddedValue`, "data"), { data: users });
        await setDoc(doc(db, `${uid}/tax/AddedValue`, "updateCounter"), {
          updateCounter: updateCounter,
        });
      } else if (serverUpdateCounter > parseInt(updateCounter)) {
        const usersDocRef = doc(db, `${uid}/tax/AddedValue`, "data");
        const usersDocSnap = await getDoc(usersDocRef);
        if (usersDocSnap.exists()) {
          let usersData = usersDocSnap.data();
          dispatch(
            actionTaxUpdateAddedValueData({
              data: usersData.data,
              updateCounter: serverUpdateCounter,
            })
          );
        }
      } else {
        // console.log("no action needed");
      }
      // console.log("Document data:");
    } else {
      // docSnap.data() will be undefined in this case
      // console.log("No such document!");
    }
  };
  return (
    <MainContainer>
      <HeaderContainer>
        <ButtonGroup minimal={true} className="mr2">
          <Button
            intent="primary"
            icon="exchange"
            // onClick={() => updateTaxAddedValue(uid,users)}
            onClick={() => handleUpdateTax()}
          />
          <Button
            intent="primary"
            icon="new-person"
            onClick={() => setAddUser(true)}
          />
          <Button
            intent="primary"
            icon="undo"
            onClick={() => dispatch(actionTaxGoBack())}
          />
        </ButtonGroup>
      </HeaderContainer>
      <ListContainer dir="rtl">
        <ul className="mt1">
          {addUser && (
            <form onSubmit={handleSubmitNewUser}>
              {addUser && (
                <>
                  <FormGroup label="Name:" labelFor="newTaxUserName">
                    <InputGroup
                      id="newTaxUserName"
                      onChange={(e) => setAddUserName(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup label="ID:" labelFor="newTaxUserId">
                    <InputGroup
                      id="newTaxUserId"
                      onChange={(e) => setAddUserId(e.target.value)}
                    />
                  </FormGroup>
                  <Button intent="success" type="submit">
                    Save
                  </Button>
                </>
              )}
            </form>
          )}
          {users &&
            users.map((user, index) => {
              return (
                <ListItem
                  onClick={() => {
                    dispatch(
                      actionTaxAddTempValues({ key: "userId", value: user.id })
                    );
                    dispatch(
                      actionTaxAddTempValues({ key: "userIndex", value: index })
                    );
                    dispatch(actionSetTaxPage("addedValueInfo"));
                  }}
                >
                  {user.name}
                </ListItem>
              );
            })}
        </ul>
      </ListContainer>
    </MainContainer>
  );
};

export default AddedValue;
