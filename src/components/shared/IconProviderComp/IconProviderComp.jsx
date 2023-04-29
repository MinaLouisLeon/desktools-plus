import React from "react";
import { IconContext } from "react-icons";
import { FcEngineering ,FcCalculator,FcSelfServiceKiosk,FcSalesPerformance} from "react-icons/fc";

const IconProviderComp = ({ iconName, settings }) => {
  const selectIcon = () => {
    switch (iconName) {
      case "settings":
        return <FcEngineering />;
      case "calc":
        return <FcCalculator />
      case "background" :
        return <FcSelfServiceKiosk />
      case "tax" :
        return <FcSalesPerformance />
      default:
        return <></>;
    }
  };
  return (
    <>
      {settings ? (
        <IconContext.Provider value={settings}>
          {selectIcon()}
        </IconContext.Provider>
      ) : (
        <>{selectIcon()}</>
      )}
    </>
  );
};

export default IconProviderComp;
