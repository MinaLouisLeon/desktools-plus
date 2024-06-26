//props targetId string
// options array of objects
// object => {text,color,icon,handler,disabled}
// icon from blueprintjs
// handler => function
// disabled => optionals
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Menu, MenuItem } from "@blueprintjs/core";
import { useSelector } from "react-redux";
const ContextMenuContainer = styled.div`
  display: ${(props) => (props.visible ? "block" : "none")};
  left: ${(props) => props.posX}px;
  top: ${(props) => props.posY}px;
  position: fixed;
  z-index: ${(props) => props.zIndex + 1};
`;
const ContextMenuComp = ({ targetId, options }) => {
  const [contextData, setContextData] = useState({
    visible: false,
    posX: 0,
    posY: 0,
  });
  const contextRef = useRef();
  const zIndex = useSelector((state) => state.AppsReducer.lastZindex);
  useEffect(() => {
    const contextMenuEventHandler = (event) => {
      const targetElement = document.getElementById(targetId);
      if (targetElement && targetElement.contains(event.target)) {
        event.preventDefault();
        setContextData({
          visible: true,
          posX: event.clientX,
          posY: event.clientY,
        });
      } else if (
        contextRef.current &&
        !contextRef.current.contains(event.target)
      ) {
        setContextData({
          ...contextData,
          visible: false,
        });
      }
    };

    const offClickHandler = (event) => {
      if (contextRef.current && !contextRef.current.contains(event.target)) {
        setContextData({
          ...contextData,
          visible: false,
        });
      }
    };

    document.addEventListener("contextmenu", contextMenuEventHandler);
    document.addEventListener("click", offClickHandler);
    return () => {
      document.removeEventListener("contextmenu", contextMenuEventHandler);
      document.removeEventListener("click", offClickHandler);
    };
  }, [contextData, targetId]);
  return (
    <ContextMenuContainer
      ref={contextRef}
      visible={contextData.visible}
      posX={contextData.posX}
      posY={contextData.posY}
      zIndex={zIndex + 10000}
    >
      <Menu className="shadow-2">
        {options.map((item) => {
          if (item.hasSubmenu) {
            return (
              <MenuItem
                icon={item.icon}
                text={item.text}
                intent={item.color}
                onClick={(e) => item.handler(e)}
                disabled={item.disabled}
              >
                {item.submenuOptions.map((submenuItem) => {
                  return (
                    <MenuItem
                      icon={submenuItem.icon}
                      text={submenuItem.text}
                      intent={submenuItem.color}
                      onClick={(e) => submenuItem.handler(e)}
                      disabled={submenuItem.disabled}
                    />
                  );
                })}
              </MenuItem>
            );
          } else {
            return (
              <MenuItem
                icon={item.icon}
                text={item.text}
                intent={item.color}
                onClick={(e) => item.handler(e)}
                disabled={item.disabled}
              />
            );
          }
        })}
      </Menu>
    </ContextMenuContainer>
  );
};

export default ContextMenuComp;
