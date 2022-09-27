import React, {useContext, useState} from "react";
import classNames from "classnames";
import {TabsContext} from "./tabs"

export interface TabPaneProps {
    label:React.ReactNode;
    disabled?:boolean;
    [propName:string]:any;
    index?: number
}

const TabPane:React.FC<TabPaneProps> = (props) => {
    const { label, disabled, children, index } = props
    
    const context = useContext(TabsContext)

    const classes = classNames('tabspane-title', {
        'is-disabled': disabled,
        'is-active': context.index === index
    })

    const handleClick = (e:React.MouseEvent) => {
        e.preventDefault()
        !disabled && context.onSelect && typeof(index) === "number" && context.onSelect(index)
    }


    return (
        <div className="tabs-pane" onClick={handleClick}>
            <div className={classes}>{label}</div>
            <div className={context.index === index ? 'tabspane-content is-opened' : 'tabspane-content'}>{children}</div>
        </div>
    )
}

TabPane.displayName = 'TabPane'

export default TabPane