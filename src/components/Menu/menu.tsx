import React, {createContext, useState} from 'react'
import classNames from 'classnames'

type MenuMode = 'horizontal' | 'vertical'

type selectCallback = (selectedIndex:number) => void

export interface MenuProps {
    mode?: MenuMode;
    className?:string;
    defaultIndex?:number;
    style?:React.CSSProperties;
    children : React.ReactNode;
    onSelect?:selectCallback
}

interface IMenuContext {
    index:number;
    onSelect?:selectCallback;
}

// 将父组件的数据传递给子组件
export const MenuContext = createContext<IMenuContext>({index: 0})


const Menu: React.FC<MenuProps> = (props) => {
    const { children, mode, className,  defaultIndex, style, onSelect } = props

    // 初始化高亮的选择的menuitem
    const [currentActive, setActive] = useState(defaultIndex)

    // 点击某个menuitem：1. 改变高亮的item 2.切换显示选中的menuitem
    const handleClick = (index: number) => {
        setActive(index)
        onSelect && onSelect(index)
    }

    const passedContext: IMenuContext = {
        index: currentActive ? currentActive : 0,
        onSelect: handleClick
    }

    const classes = classNames('subassembly', className, {
        'menu-vertical': mode === 'vertical'
    })

    return (
        <ul className={classes} style={style}>
            <MenuContext.Provider value={passedContext}>
                {children}
            </MenuContext.Provider>
        </ul>
    )
}

Menu.defaultProps = {
    mode: 'horizontal',
    defaultIndex: 0
}

export default Menu