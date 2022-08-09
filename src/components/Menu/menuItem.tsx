import React, { useContext } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";

export interface MenuItemProps {
    disable?:boolean;
    index:number;
    className?:string;
    style?:React.CSSProperties;
    children : React.ReactNode
}

const MenuItem:React.FC<MenuItemProps> = (props) => {
    const {disable, index, className, style, children} = props
    const context = useContext(MenuContext)
    const classes = classNames('menu-item', className, {
        'is-disable': disable,
        'is-active': index === context.index
    })

    const handleClick = () => {
        if(context.onSelect && !disable) {
            context.onSelect(index)
        }
    }

    return (
        <li className={classes} style={style} onClick={handleClick}>
            {children}
        </li>
    )
}

export default MenuItem


