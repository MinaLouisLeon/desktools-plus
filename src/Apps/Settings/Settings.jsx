import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ItemGridComp from "../../components/shared/ItemGridComp/ItemGridComp";
import BackgroudPage from "./BackgroudPage";
import { actionSetNewSettingsContent } from "../../redux/settingsReducer";
const Settings = () => {
  const dispatch = useDispatch(null);
  const appContent = useSelector((state) => state.settingsReducer.appContent);
  const handleSettingsPages = () => {
    let pageName = appContent.slice(-1);
    switch (pageName[0]) {
      case "mainSettingsPage":
        return (
          <ItemGridComp
            items={[
              {
                text: "Backgound",
                icon: "background",
                handler: () => {
                  dispatch(actionSetNewSettingsContent("BackgroudPage"));
                },
              },
            ]}
          />
        );
      case "BackgroudPage" :
        return <BackgroudPage />
      default:
        break;
    }
  };
  return <>{handleSettingsPages()}</>;
};

export default Settings;
