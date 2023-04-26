import React from "react";
import { IconContext } from "react-icons";
import { FcEngineering } from "react-icons/fc";

const IconProviderComp = ({ iconName, settings }) => {
  const selectIcon = () => {
    switch (iconName) {
      case "settings":
        return <FcEngineering />;
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
