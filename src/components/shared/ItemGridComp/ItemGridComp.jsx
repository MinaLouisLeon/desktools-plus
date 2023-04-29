import React from 'react'
import styled from "styled-components";
import IconProviderComp from '../IconProviderComp/IconProviderComp';
const ItemsContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    overflow: auto;
    flex-direction: row;
    flex-wrap: wrap;
`
const Item = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 0 8px 2px rgb(0 0 0 / 10%);
    height: fit-content;
    width: fit-content;
    cursor: pointer;
`
const ItemGridComp = ({items,children}) => {
  return (
    <ItemsContainer>
        {items && items.map((item) => {
            return(
                <Item className="ma2 pa2 br2"
                    onClick={() => item.handler()}
                >
                    <IconProviderComp 
                        iconName={item.icon}
                        settings={{
                            size : "1.8rem"
                        }}
                    />
                    {item.text}
                </Item>
            )
        })}
        {children}
    </ItemsContainer>
  )
}

export default ItemGridComp
