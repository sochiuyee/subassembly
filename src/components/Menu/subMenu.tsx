import React, {FunctionComponentElement, useContext, useState} from "react";
import classNames from "classnames";
import {MenuContext} from "./menu"
import {MenuItemProps} from "./menuItem"

interface SubMenuProps {
    index?:number;
    title?:string;
    className?:string;
    [propName:string]:any
}

const SubMenu:React.FC<SubMenuProps> = ({index, title, className, children}) => {
    // Menu嵌套SubMenu,需要获取Menu传递index和点击事件的MenuContex
    const context = useContext(MenuContext)
    const classes = classNames('submenu-item menu-item', className, {
        'is-active': context.index === index
    })

    const renderChildren = () => {
        const childComponent = React.Children.map(children, (child, idx) => {
            // SubMenu 嵌套的只允许MenuItem
            const childElement = child as FunctionComponentElement<MenuItemProps>
            if (childElement.type.displayName === 'MenuItem') {
                return childElement
            } else {
                console.warn('SubMenu has a child which is not a MenuItem')
            }
        })
        return childComponent
    }

    // 使用useState初始化收起菜单, setOpen控制菜单内容的显示隐藏
    const [menuOpen, setOpen] = useState(false)

    const handleClick = (e:React.MouseEvent) => {
        e.preventDefault()
        setOpen(!menuOpen)
    }

    let timer:any
    const handleMouse = (e:React.MouseEvent, toggle:boolean) => {
        e.preventDefault()
        clearTimeout(timer)
        timer = setTimeout(() => {
            setOpen(toggle)
        }, 300)
    }

    const clickEvents = context.mode === 'vertical' && {
        onClick: handleClick
    }

    /**
     * 垂直模式下
     * 鼠标移入显示菜单内容
     * 鼠标移出隐藏菜单内容
     */
    const hoverEvents = context.mode !== 'vertical' && {
        onMouseEnter: (e:React.MouseEvent) => {
            handleMouse(e, true)
        },
        onMouseLeave: (e:React.MouseEvent) => {
            handleMouse(e, false)
        }
    }

    return (
        <li className={classes} key={index} {...hoverEvents}>
            <div className="submenu-title" {...clickEvents}>{title}</div>
            {renderChildren()}
        </li>
    )
}

export default SubMenu