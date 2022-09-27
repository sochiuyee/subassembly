import React, {useState, createContext} from "react";
import classNames from "classnames";
import {TabPaneProps} from "./tabPane"

type TabsMode = 'vertical' | 'horizontal'

export interface TabsProps {
    mode?:TabsMode;
    defaultIndex?:number;
    onSelect?:(index:number) => void;
    [propName:string]:any;
    showType?:string;
}

interface ITabsContext {
    onSelect?:(index:number) => void;
    index: number;
    mode?: TabsMode;
}

export const TabsContext = createContext<ITabsContext>({
    index: 0
})

const Tabs:React.FC<TabsProps> = (props) => {
    const {mode, defaultIndex, onSelect, children, ...restProps} = props

    const classes = classNames('tabs-list', {
        'is-vertical': mode === 'vertical',
        'is-horizontal': mode !== 'vertical'
    })

    const [currentActive, setActive] = useState(defaultIndex)


    // 选中TabItem的回调：设置高亮的tabItem，点击后的回调
    const handleClick = (index: number) => {
        setActive(index)
        onSelect && onSelect(index)
    }

    // 组件通信，告知tabPane选中哪个，并且给与点击回调
    const passedContext:ITabsContext = {
        index: currentActive || 0,
        onSelect: handleClick,
        mode
    }

    // 对Tabs的children进行遍历，只渲染tabPane的children
    const renderLabelChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<TabPaneProps>
            if (childElement.type.displayName === 'TabPane' && (React.isValidElement(childElement.props.label) || typeof childElement.props.label)) {
                return childElement.props.label
            } else {
                console.log('Tabs has a child which is not a tabPane')
            }
        })
    }

    return (
        <div className={mode=== 'vertical' ? 'is-vertical tabs': 'is-horizontal tabs'} {...restProps}>
            <TabsContext.Provider value={passedContext}>
                <div className="wrapper">
                    {renderLabelChildren()}
                </div>
            </TabsContext.Provider>
        </div>
    )
}

Tabs.defaultProps = {
    defaultIndex: 0,
    mode: 'horizontal'
}

export default Tabs