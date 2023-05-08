import React from "react";
import { IconContext } from "react-icons";
import { FcEngineering ,FcCalculator,FcSelfServiceKiosk,FcSalesPerformance,FcGlobe,FcPhoneAndroid} from "react-icons/fc";

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
        case "MapsXYconventer":
          return <FcGlobe />
        case 'FcPhoneAndroid':
          return <FcPhoneAndroid/>
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
