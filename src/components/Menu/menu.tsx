import React, {createContext, useState} from "react";
import classNames from "classnames";
import {MenuItemProps} from "./menuItem"

type MenuMode = 'horizontal' | 'vertical'
export interface MenuProps {
    mode?:MenuMode;
    className?:string;
    style?:React.CSSProperties;
    children?:React.ReactNode;
    defaultIndex?:string;
    onSelect?:(index:string) => void;
    defaultSubMenuProps?:string[];
}

// 定义要传递的context 规范
interface IMenuContext {
    index?:string;
    onSelect?:(index:string) => void;
    mode?:string;
    defaultSubMenuProps?:string[]
}

// 需要导出创建的context，给子组件的menuItem 使用useContext(创建的context)
export const MenuContext = createContext<IMenuContext>({index: '0'})

const Menu:React.FC<MenuProps> = (props) => {
    const {mode, className, style, children, defaultIndex, onSelect, defaultSubMenuProps} = props


    // 点击改变高亮的menuItem
    const [currentActive, setActive] = useState(defaultIndex)

    // 点击menu 会执行的回调：改变选中的menu，执行回调
    const handleClick = (index: string) => {
        setActive(index)
        onSelect && onSelect(index)
    }

    // 定义要传递给menuItem的value值：点击高亮选中的menuItem，执行点击的回调
    const passedContext:IMenuContext = {
        index: currentActive || '0',
        onSelect: handleClick,
        mode,
        defaultSubMenuProps
    }

    const classes = classNames('menu', className, {
        'menu-vertical':mode === 'vertical',
        'menu-horizontal': mode !== 'vertical'
    })

    // 如果在ul里无脑用children，那menu里如果嵌套了并不是menuItem的子组件，或者children传入了函数，不能使用children.map方法。React.Children 提供了用于处理 this.props.children 不透明数据结构的实用方法。
    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            const { displayName } = childElement.type
            if (displayName === 'MenuItem') {
                return React.cloneElement(childElement, {
                    index: index.toString()
                })
            } else {
                console.warn("Warning Menu has a child which is not a MenuItem")
            }
        })
    }

    return (
        <ul className={classes} style={{...style}} data-testid="test-menu">
            {/* 使用useContext 父子组件通信 */}
            <MenuContext.Provider value={passedContext}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )
}

Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultSubMenuProps: []
}

export default Menu