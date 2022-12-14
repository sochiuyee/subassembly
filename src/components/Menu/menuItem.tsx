import React, {useContext} from "react";
import classNames from "classnames";
import {MenuContext} from "./menu"

export interface MenuItemProps {
    disable?:boolean;
    index?:string;
    className?:string;
    style?:React.CSSProperties;
    [propName:string]:any
}

const MenuItem:React.FC<MenuItemProps> = (props) => {

    const context = useContext(MenuContext)

    const {disable, index, className, style, children} = props

    const classes = classNames('menu-item', className, {
        'is-active': context.index === index,
        'is-disable': disable
    })

    const handleClick = () => {
        if (!disable && context.onSelect && typeof(index) === 'string') {
            context.onSelect(index)
        }
    }

    return (
        <li className={classes} style={{...style}} onClick={handleClick}>
            {children}
        </li>
    )
}

MenuItem.displayName = 'MenuItem'

export default MenuItem